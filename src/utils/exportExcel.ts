/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export interface ApplicationForExport {
    'Applicant ID': string;
    'Applicant Name': string;
    'Email': string;
    'Phone': string;
    'Job Title': string;
    'Job Role': string;
    'Fit Score': number | string;
    'Experience': string;
    'Status': string;
    'Applied Date': string;
    'Location': string;
    'Summary': string;
    'AI Summary': string;
    'Motivation': string;
    'Strengths': string;
    'Areas of Improvement': string;
    'Key Traits': string;
    'Availability': string;
    'Driving License': string;
    'Eligible to Work in NZ': string;
    'Work Permit Type': string;
}

export const formatApplicationsForExcel = (applications: any[]): ApplicationForExport[] => {
    return applications.map(app => ({
        'Applicant ID': app.id,
        'Applicant Name': app.user?.name || 'N/A',
        'Email': app.cv?.email || app.user?.email || 'N/A',
        'Phone': app.cv?.phone || 'N/A',
        'Job Title': app.job?.title || 'N/A',
        'Job Role': app.job?.role || 'N/A',
        'Fit Score': app.applicationAIResults?.jobFitScore || 'N/A',
        'Experience': app.cv?.jobTitle || 'N/A',
        'Status': app.status,
        'Applied Date': app.appliedAt ? new Date(app.appliedAt).toLocaleDateString('en-GB') : 'N/A',
        'Location': app.cv?.location || 'N/A',
        'Summary': app.cv?.summary || 'N/A',
        'AI Summary': app.applicationAIResults?.summary?.replace(/\n/g, ' ') || 'N/A',
        'Motivation': app.applicationAIResults?.motivation?.replace(/\n/g, ' ') || 'N/A',
        'Strengths': app.applicationAIResults?.strengths?.join('; ') || 'N/A',
        'Areas of Improvement': app.applicationAIResults?.areasOfImprovement?.join('; ') || 'N/A',
        'Key Traits': app.applicationAIResults?.keyTraits?.join(', ') || 'N/A',
        'Availability': app.cv?.availability ? new Date(app.cv.availability).toLocaleDateString('en-GB') : 'N/A',
        'Driving License': app.cv?.hasDrivingLicense ? 'Yes' : 'No',
        'Eligible to Work in NZ': app.cv?.eligibleToWorkInNZ ? 'Yes' : 'No',
        'Work Permit Type': app.cv?.workPermitType || 'N/A'
    }));
};

export const exportToExcel = (data: ApplicationForExport[], filename: string = 'applications') => {
    if (!data || data.length === 0) {
        console.warn('No data to export');
        return;
    }

    try {
        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Convert data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Auto-size columns
        const columnWidths = data.reduce((acc: any[], row) => {
            Object.keys(row).forEach((key, index) => {
                const cellLength = String(row[key as keyof ApplicationForExport]).length;
                if (!acc[index] || cellLength > acc[index].wch) {
                    acc[index] = { wch: Math.min(cellLength, 50) }; // Max width 50
                }
            });
            return acc;
        }, []);

        worksheet['!cols'] = columnWidths;

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Applications');

        // Generate Excel file
        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
            bookSST: false
        });

        // Create blob and download
        const blob = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        saveAs(blob, `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`);

    } catch (error) {
        console.error('Error exporting to Excel:', error);
        throw error;
    }
};

// Export with enhanced styling (if needed)
export const exportToExcelWithFormatting = (data: ApplicationForExport[], filename: string = 'applications') => {
    if (!data || data.length === 0) return;

    // Create workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add basic formatting through cell styles
    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');

    // Style header row (row 0)
    for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
        if (!worksheet[cellAddress]) continue;

        worksheet[cellAddress].s = {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "4F46E5" } }, // Indigo color
            alignment: { vertical: "center", horizontal: "center" }
        };
    }

    // Style fit score column (column index 6)
    for (let R = 1; R <= range.e.r; ++R) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: 6 });
        const cell = worksheet[cellAddress];
        if (cell && typeof cell.v === 'number') {
            cell.s = {
                font: { bold: true, color: { rgb: cell.v >= 80 ? "059669" : cell.v >= 60 ? "D97706" : "DC2626" } }
            };
        }
    }

    workbook.SheetNames.push('Applications');
    workbook.Sheets['Applications'] = worksheet;

    XLSX.writeFile(workbook, `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`);
};