import activestaff from "@/assets/dashboard/a.png";
import totalpatients from "@/assets/dashboard/b.png";
import warningerror from "@/assets/dashboard/c.png";
import success from "@/assets/dashboard/d.png";

const SupportCard = () => {
  const statusData = [
    {
      title: "Total Amount",
      amount: "$27,850",
      icon: activestaff,
    },
    {
      title: "Total Active Jobs",
      amount: "247",
      icon: totalpatients,
    },
    {
      title: "Active Job Seeker",
      amount: "2,942",
      icon: warningerror,
    },
    {
      title: "Farm Owner/Employer",
      amount: "656",
      icon: success,
    },
  ];

  const colors = ["#12335B", "#12335B", "#12335B", "#12335B"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 w-full">
      {statusData.map((single, index) => {
        let amountColor = "#000000";
        if (single.amount === "Successful") amountColor = "#4CAF50";
        if (single.amount === "7") amountColor = "#F3AA4B";

        return (
          <div
            key={single.title}
            className="w-full h-[100px] p-5 sm:p-6 bg-white rounded-2xl flex items-center shadow-sm"
          >
            {/* Icon */}
            <div className="bg-[#F9F8F6] border-[#F6F4F2] w-12 h-12 rounded-xl p-3 flex items-center justify-center mr-4">
              <img
                src={single.icon}
                alt={single.title}
                className="w-6 h-6 object-contain"
              />
            </div>

            {/* Title and Amount */}
            <div className="flex flex-col justify-center">
              <h1
                className="text-[18px] leading-[160%] font-sans font-medium"
                style={{ color: colors[index] }}
              >
                {single.title}
              </h1>
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-semibold font-Robot tracking-[-0.68px]"
                style={{ color: amountColor }}
              >
                {single.amount}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SupportCard;
