import "@/styles/globals.css";
import { FeedbackLayoutWrapper } from "@/components/feedback/feedbackLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FeedbackLayoutWrapper>{children}</FeedbackLayoutWrapper>;
}
