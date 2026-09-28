import Pageheader from "@/components/common/Pageheader";
import SettingsPageContent from "@/components/settings/settingspage";

export default function SettingsPage() {
  return (
    <div>
      <Pageheader
        title="Settings"
        description="Manage your account and application preferences."
      />

      <div className="mt-6">
        <SettingsPageContent />
      </div>
    </div>
  );
}