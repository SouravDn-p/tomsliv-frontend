import BorderWrapper from "@/components/Reuseable/BorderWrapper";
import TextSmall from "./TextSmall";
import Divider from "@/components/Reuseable/Divider";
import Stack from "@/components/Reuseable/Stack";
import Toggle from "@/components/Reuseable/Toggle";
import { Button } from "@/components/ui/button";

export default function UserNotification() {
  return (
    <BorderWrapper className="gap-8 md:p-6 p-4">
      <h2 className="text-xl font-medium">Notification Preferences</h2>
      <Stack className="justify-between" direction="row">
        <div>
          <h4 className="font-medium">Email Notifications</h4>
          <TextSmall>Receive notifications by email.</TextSmall>
        </div>
        <Toggle />
      </Stack>
      <Divider className="my-0" />
      <Stack className="gap-4">
        <h4 className="font-semibold">Job Alerts</h4>
        <Stack direction="row">
          <Stack className="ml-4">
            <h3>New related jobs alerts</h3>
            <TextSmall>
              Get notified when someone applies to your jobs
            </TextSmall>
          </Stack>
          <Toggle />
        </Stack>
        <Stack direction="row">
          <Stack className="ml-4">
            <h3>New related jobs alerts</h3>
            <TextSmall>
              Get notified when someone applies to your jobs
            </TextSmall>
          </Stack>
          <Toggle />
        </Stack>
      </Stack>
      <div className="text-right">
        <Button className="px-6" variant={"primary"}>
          Save & Changes
        </Button>
      </div>
    </BorderWrapper>
  );
}
