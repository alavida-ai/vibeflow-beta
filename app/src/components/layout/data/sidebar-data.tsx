import {
  IconHome,
  IconPalette,
  IconComponents,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { type SidebarData } from "../types"

export const sidebarData: SidebarData = {
  user: {
    name: "Design System",
    email: "vibeflow.design",
    avatar: "/avatars/ausrobdev-avatar.png",
  },
  teams: [
    {
      name: "Vibeflow Design System",
      logo: ({ className }: { className: string }) => (
        <Logo className={cn("invert dark:invert-0", className)} />
      ),
      plan: "Design Tokens + Components",
    },
  ],
  navGroups: [
    {
      title: "Design System",
      items: [
        {
          title: "Home",
          url: "/",
          icon: IconHome,
        },
        {
          title: "Tokens",
          url: "/tokens",
          icon: IconPalette,
        },
        {
          title: "Components",
          url: "/components",
          icon: IconComponents,
        },
      ],
    },
  ],
}
