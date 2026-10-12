import TimelineDot from "./TimelineDot";

const FarmInfoCard = ({ farmDetails }: { farmDetails: any[] }) => {
  return (
    <div className="border border-border-primary p-6 rounded-2xl mt-6 grid md:grid-cols-2 gap-6">
      {farmDetails.map((item, index) => (
        <div key={index} className="flex h-fit gap-8">
          <TimelineDot />
          <div className="flex flex-col gap-3">
            <h5>{item.label}</h5>
            <p className="text-[#515756]">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FarmInfoCard;
