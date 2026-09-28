import AccountSetting from "./AccountSetting";
import NotificationSettings from "./NotificationSettings";
import ProfileCard from "./ProfileCard";
import SecuritySettings from "./SecuritySettings";
import ThemeSettings from "./ThemeSettings";

export default function SettingsPageContent() {
  return (
    <div className="space-y-6">
      <ProfileCard />

      <AccountSetting />

      <NotificationSettings />

      <SecuritySettings />

      <ThemeSettings />
    </div>
  );
}