/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CVComparisonModal from "../Dashboard/CVComparisonModal";
import { useCompareTowCvMutation } from "@/redux/features/CV/cv.Api";
import { toast } from "sonner";
import AllApplicantsManagementTable from "./AllApplicantsManagementTable";
import { CVItem } from "@/redux/features/CV/Cv.type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PageHeader from "@/components/Reuseable/PageHeader";
import { FiFilter } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Download,
  ChevronDown,
  FileText,
  Sheet,
  Loader2,
  Users,
} from "lucide-react";
import { useGetAllApplicationsForFarmQuery } from "@/redux/features/jobApplication/jobAppliction.Api";
import { ErrorMessage } from "@/common/ErrorMessage";
import {
  formatApplicationsForExcel,
  exportToExcel,
  exportToExcelWithFormatting,
} from "@/utils/exportExcel";

const AllApplicants = () => {
  // Filter states
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState(1);
  const [exportLoading, setExportLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<{
    cv1: CVItem;
    cv2: CVItem;
    aiResult: any;
  } | null>(null);
  const location=useLocation()
  const isAppicantList=location.pathname.startsWith('/owner-dashboard/my-jobs/applicants')

  const [compareCVs, { isLoading: isComparing }] = useCompareTowCvMutation();
  const {jobId} = useParams();
  const limit = 10;
  const { data, isLoading, error, isFetching } =
    useGetAllApplicationsForFarmQuery({
      page,
      limit,
      search,
      status: status === "ALL" ? "" : status,
      sortOption: sortOption === "ALL" ? "" : sortOption,
      jobId: jobId,
    });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Export current page data
  const handleExportCurrentPage = () => {
    if (!data?.data || data.data.length === 0) {
      alert("No data to export");
      return;
    }

    try {
      setExportLoading(true);
      const formattedData = formatApplicationsForExcel(data.data);
      exportToExcel(formattedData, `applications_page_${page}`);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data. Please try again.");
    } finally {
      setExportLoading(false);
    }
  };

  // Export all data (you might need to fetch all pages)
  const handleExportAll = async () => {
    try {
      setExportLoading(true);

      // You'll need to implement an API call to fetch ALL data
      // or iterate through pages. Here's an example approach:

      // Option 1: If your API supports getting all data at once
      // const allDataResponse = await fetchAllApplications();
      // const formattedData = formatApplicationsForExcel(allDataResponse);

      // Option 2: Export current filtered view only
      const formattedData = formatApplicationsForExcel(data?.data || []);
      exportToExcel(
        formattedData,
        `applications_all_${new Date().toISOString().split("T")[0]}`
      );
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data. Please try again.");
    } finally {
      setExportLoading(false);
    }
  };

  // Export with formatting
  const handleExportWithFormatting = () => {
    if (!data?.data || data.data.length === 0) {
      alert("No data to export");
      return;
    }

    try {
      setExportLoading(true);
      const formattedData = formatApplicationsForExcel(data.data);
      exportToExcelWithFormatting(formattedData, `applications_formatted`);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export formatted data.");
    } finally {
      setExportLoading(false);
    }
  };

  const handleToggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (ids: string[]) => {
    if (selectedIds.length === ids.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(ids);
    }
  };

  const handleCompare = async () => {
    if (selectedIds.length !== 2) {
      toast.error("Please select exactly 2 applicants to compare");
      return;
    }

    try {
      const app1 = data?.data.find((a: any) => a.id === selectedIds[0]);
      const app2 = data?.data.find((a: any) => a.id === selectedIds[1]);

      if (!app1 || !app2) return;

      const response = await compareCVs({
        cvId1: app1.cvId,
        cvId2: app2.cvId,
      }).unwrap();

      setComparisonResult({
        cv1: app1.cv,
        cv2: app2.cv,
        aiResult: response.data.aiResult || response.data,
      });
      setIsCompareModalOpen(true);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to compare candidates");
    }
  };

  return (
    <div className="pb-24 sm:pb-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
       
        {
          !isAppicantList ?( <PageHeader
          title="All Applicants"
          description="Review and manage applications."
        />):(
          <PageHeader title={`Total Applicants (${data?.metadata?.total ?? 0}) `} />
        )
        }

      <div className=" flex gap-2.5 flex-wrap">
        

        <Button
          variant="primary"
          onClick={handleCompare}
          disabled={selectedIds.length !== 2 || isComparing}
          className="hidden sm:flex w-full sm:w-auto mt-2 sm:mt-0"
        >
          {isComparing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Users className="mr-2 h-4 w-4" />
          )}
          Compare Selected ({selectedIds.length})
        </Button>
          {/* Export Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="primary"
              disabled={exportLoading || isLoading}
              className="w-full sm:w-auto"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Data
              <ChevronDown className="ml-2 h-4 w-4" />
              {exportLoading && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white border-none"
          >
            <DropdownMenuItem
              onClick={handleExportCurrentPage}
              disabled={!data?.data || data.data.length === 0 || exportLoading}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Export Current Page (Excel)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleExportAll}
              disabled={!data?.data || data.data.length === 0 || exportLoading}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Export All Data (Excel)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleExportWithFormatting}
              disabled={!data?.data || data.data.length === 0 || exportLoading}
              className="flex items-center gap-2"
            >
              <Sheet className="h-4 w-4" />
              Export with Formatting
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col xl:flex-row xl:items-center bg-white justify-between gap-4 xl:gap-7 my-6 py-4 px-4 sm:px-10 rounded-2xl">
        <div className="flex items-center gap-2 text-[#232928] shrink-0">
          <FiFilter size={24} className="text-[#6B7268]" />
          <span className="font-medium text-lg">Filters:</span>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
          {/* Search Input */}
          <div className="w-full flex-1">
            <Input
              placeholder="Search by name, email, or phone number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Status Filter */}
            <Select onValueChange={(value) => setStatus(value)} defaultValue="">
              <SelectTrigger className="w-full sm:w-[150px] bg-[#F8F8F8] border-[#00000000] shrink-0">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-none">
                <SelectGroup>
                  <SelectLabel>Filter By</SelectLabel>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="NEW">New</SelectItem>
                  <SelectItem value="SHORTLISTED">Shortlisted</SelectItem>
                  <SelectItem value="REVIEWED">Reviewed</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Sort Filter */}
            <Select onValueChange={(value) => setSortOption(value)}>
              <SelectTrigger className="w-full sm:w-[180px] bg-[#F8F8F8] border-[#00000000] shrink-0">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white border-none">
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="mostRecent">Most Recent</SelectItem>
                  <SelectItem value="fitScoreHighToLow">
                    Fit Score (High to Low)
                  </SelectItem>
                  <SelectItem value="fitScoreLowToHigh">
                    Fit Score (Low to High)
                  </SelectItem>
                  <SelectItem value="experienceHighToLow">
                    Experience (High to Low)
                  </SelectItem>
                  <SelectItem value="experienceLowToHigh">
                    Experience (Low to High)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div>
        <AllApplicantsManagementTable
          data={data?.data || []}
          isLoading={isLoading}
          isFetching={isFetching}
          currentPage={page}
          totalPages={data?.metadata?.totalPage || 1}
          totalItems={data?.metadata?.total || 0}
          selectedIds={selectedIds}
          onToggleSelection={handleToggleSelection}
          onSelectAll={handleSelectAll}
          onPageChange={handlePageChange}
        />
        {error && <ErrorMessage />}
      </div>

      <CVComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        result={comparisonResult}
      />

      {/* Mobile Floating Selection Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 sm:hidden w-[92%] max-w-md">
          <div className="bg-white border border-border-primary shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl p-3 flex items-center justify-between animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="flex items-center gap-2.5">
              <div className="bg-primary-blue/10 text-primary-blue p-2 rounded-xl">
                <Users size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900 leading-none">
                  {selectedIds.length} {selectedIds.length === 1 ? "Applicant" : "Applicants"}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">
                  {selectedIds.length === 2 ? "Ready to compare" : "Select another to compare"}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedIds([])}
                className="h-8 px-2 text-[10px] text-red-500 hover:text-red-600 hover:bg-red-50 font-medium"
              >
                Clear
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCompare}
                disabled={selectedIds.length !== 2 || isComparing}
                className="h-9 px-4 rounded-xl text-xs font-semibold shadow-sm shadow-primary-blue/20"
              >
                {isComparing ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  "Compare"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllApplicants;
