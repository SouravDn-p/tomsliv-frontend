import { useState } from "react";
import { format } from "date-fns";
import { useGetContactsQuery } from "@/redux/features/contact/contactApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Eye,
  Loader2,
  Mail,
  Phone,
  Calendar,
  User,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ContactPage = () => {
  const { data: contactsData, isLoading, isFetching } = useGetContactsQuery({});
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleViewMessage = (message: any) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "MMM dd, yyyy • hh:mm a");
  };

  const getTimeAgo = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return format(date, "MMM dd");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Filter and search logic
  const filteredContacts =
    contactsData?.data?.filter((contact: any) => {
      const matchesSearch =
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase());

      // Add more filter logic here based on statusFilter and dateFilter
      return matchesSearch;
    }) || [];

  // Pagination logic
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContacts = filteredContacts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-9 w-28" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-7 w-16" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters Skeleton */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-10 flex-1" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-[150px]" />
                <Skeleton className="h-10 w-[150px]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Skeleton */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gray-50 border-b">
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50/80">
                  <TableRow>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <TableHead key={i}>
                        <Skeleton className="h-4 w-20" />
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 5 }).map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {Array.from({ length: 6 }).map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          {cellIndex === 0 ? (
                            <Skeleton className="h-10 w-10 rounded-full" />
                          ) : cellIndex === 5 ? (
                            <Skeleton className="h-8 w-16 ml-auto" />
                          ) : (
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-24" />
                              {cellIndex === 1 && (
                                <Skeleton className="h-3 w-32" />
                              )}
                              {cellIndex === 2 && (
                                <Skeleton className="h-3 w-40" />
                              )}
                            </div>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Skeleton */}
            <div className="flex items-center justify-between p-4 border-t border-border-primary">
              <Skeleton className="h-4 w-48" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-24" />
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-8" />
                  ))}
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-500 mt-1">
            Manage and view customer inquiries
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">
                  Total Messages
                </p>
                <p className="text-2xl font-bold text-blue-900 mt-1">
                  {contactsData?.metadata?.total || 0}
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {contactsData?.data?.filter(
                    (c: any) =>
                      new Date(c.createdAt).toDateString() ===
                      new Date().toDateString()
                  ).length || 0}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className=" border border-border-primary ">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {contactsData?.data?.filter((c: any) => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(c.createdAt) > weekAgo;
                  }).length || 0}
                </p>
              </div>
              <Mail className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">With Phone</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {contactsData?.data?.filter((c: any) => c.phone).length || 0}
                </p>
              </div>
              <Phone className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border border-border-primary">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search messages by name, email, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {/* <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[150px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>
        </CardContent>
      </Card>

      {/* Table with fetching indicator */}
      <Card className="overflow-hidden relative border border-border-primary">
        {isFetching && (
          <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center">
            <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              <span className="text-sm text-gray-600">Updating...</span>
            </div>
          </div>
        )}

        <CardHeader className="bg-gray-50 border-b border-border-primary">
          <CardTitle className="text-lg">
            Messages ({filteredContacts.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-5 border border-[#E4E4E4] rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
              <div className="xl:col-span-4 w-full">
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <Table className="min-w-[800px] w-full text-sm">
                    <TableHeader className="bg-gray-100 border-b border-gray-200">
                      <TableRow className="border border-border-primary">
                        <TableHead className="w-12"></TableHead>
                        <TableHead className="font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Contact
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Subject
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Phone
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Date
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedContacts.map((contact: any) => (
                        <TableRow
                          key={contact.id}
                          className="hover:bg-gray-50/50 border-b border-gray-100 last:border-0"
                        >
                          <TableCell>
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
                              <span className="font-semibold text-blue-700 text-sm">
                                {getInitials(contact.name)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {contact.name}
                              </p>
                              <p className="text-sm text-gray-500 truncate max-w-[180px]">
                                {contact.email}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[250px]">
                              <p className="font-medium text-gray-900 truncate">
                                {contact.subject}
                              </p>
                              <p className="text-sm text-gray-500 truncate mt-1">
                                {contact.message.substring(0, 60)}...
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {contact.phone ? (
                                <>
                                  <Phone className="h-4 w-4 text-gray-400" />
                                  <span className="text-gray-700">
                                    {contact.phone}
                                  </span>
                                </>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="text-gray-400"
                                >
                                  No Phone
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm text-gray-900">
                                {formatDate(contact.createdAt)}
                              </p>
                              <p className="text-xs text-gray-400">
                                {getTimeAgo(contact.createdAt)}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewMessage(contact)}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="ml-2 hidden sm:inline">
                                View
                              </span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {(!contactsData?.data ||
                        contactsData.data.length === 0) && (
                        <TableRow>
                          <TableCell colSpan={6} className="h-64 text-center">
                            <div className="flex flex-col items-center justify-center space-y-4">
                              <MessageSquare className="h-16 w-16 text-gray-300" />
                              <div>
                                <p className="text-lg font-medium text-gray-900">
                                  No messages found
                                </p>
                                <p className="text-gray-500">
                                  Start receiving messages from your contact
                                  form
                                </p>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          {filteredContacts.length > 0 && (
            <div className="flex items-center justify-between p-4 border-t border-border-primary">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, filteredContacts.length)}{" "}
                of {filteredContacts.length} messages
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Message Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] bg-white border border-border-primary overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Message Details
            </DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-6 pt-4">
              {/* Contact Info */}
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                  <span className="font-bold text-white text-sm">
                    {getInitials(selectedMessage.name)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {selectedMessage.name}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      {selectedMessage.email}
                    </div>
                    {selectedMessage.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        {selectedMessage.phone}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {formatDate(selectedMessage.createdAt)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Subject
                </h4>
                <p className="text-base font-semibold text-gray-900 px-4 py-3 bg-gray-50 rounded-lg">
                  {selectedMessage.subject}
                </p>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Message
                </h4>
                <div className="p-4 bg-gray-50 rounded-lg border border-border-primary">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border-primary">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>

                <a
                  className="flex items-center gap-2 rounded-lg px-4  bg-primary-blue text-white font-normal hover:bg-[#2a7ce0] hover:shadow-lg hover:shadow-primary-blue/20 disabled:bg-[#6A92C3]"
                  href={`mailto:${
                    selectedMessage.email
                  }?subject=Re: ${encodeURIComponent(
                    selectedMessage.subject
                  )}&body=%0D%0A%0D%0A--- Original Message ---%0D%0A${encodeURIComponent(
                    selectedMessage.message
                  )}`}
                >
                  <Mail className="h-4 w-4" />
                  Reply via Email
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactPage;
