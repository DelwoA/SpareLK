import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

type LiProps = {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  icon?: any;
  currentPath?: string;
};

export default function Li({
  children,
  to,
  icon,
  onClick,
  currentPath,
}: LiProps) {
  return (
    <Link
      id="nav-link"
      to={to}
      onClick={onClick}
      className={`block px-4 py-2 text-slate-700 text-sm hover:bg-accent hover:text-accent-foreground rounded ease-in duration-75 
                ${currentPath === to && "bg-muted text-muted-foreground"}`}
    >
      {icon && <FontAwesomeIcon className="mr-2 text-slate-700" icon={icon} />}
      {children}
    </Link>
  );
}
