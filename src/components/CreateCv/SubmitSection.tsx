import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";

export const SubmitSection = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div className="flex justify-end">
      <Button type="submit" disabled={isSubmitting} variant={"primary"}>
        {isSubmitting ? "Saving..." : "Save & Update"}
      </Button>
    </div>
  );
};
