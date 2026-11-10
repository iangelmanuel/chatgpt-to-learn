import { NavLink } from "react-router-dom"

type Props = {
  option: {
    to: string
    icon: string
    title: string
    description: string
  }
}

export const SidebarMenuItem = ({ option }: Props) => {
  return (
    <NavLink
      key={option.to}
      to={option.to}
      className={({ isActive }) =>
        isActive
          ? "flex items-center justify-center rounded-md bg-gray-800 p-2 transition-colors"
          : "flex items-center justify-center rounded-md p-2 transition-colors hover:bg-gray-800"
      }
    >
      <i className={`fas ${option.icon} mr-4 text-2xl text-indigo-400`} />
      <div className="flex flex-grow flex-col">
        <span className="text-lg font-semibold text-white">{option.title}</span>
        <span className="text-sm text-gray-400">{option.description}</span>
      </div>
    </NavLink>
  )
}
