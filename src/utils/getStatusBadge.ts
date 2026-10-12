export const getStatusBadge = (status: string) => {
    switch (status) {
        case "ACTIVE":
            return {
                bg: "bg-[#00A4261A]",
                text: "text-[#00A426]",
                label: "Active",
            };
        case "PAUSED":
            return {
                bg: "bg-yellow-100",
                text: "text-yellow-700",
                label: "Paused",
            };
        case "CLOSED":
            return { bg: "bg-red-100", text: "text-red-700", label: "Closed" };
        default:
            return { bg: "bg-gray-100", text: "text-gray-700", label: status };
    }
};