import leftSvg from "../assets/left.svg";
import rightSvg from "../assets/right.svg";

import { Button } from "./Button";

type Props = {
  current: number;
  total: number;
};

export function Pagination({ current, total }: Props) {
  return (
    <div className="flex flex-1 justify-center items-center gap-4">
      <Button variant="iconSmall">
        <img src={leftSvg} alt="Página anterior" />
      </Button>
      <span className="text-gray-200 text-sm">
        {current} de {total}
      </span>
      <Button variant="iconSmall">
        <img src={rightSvg} alt="Próxima página" />
      </Button>
    </div>
  );
}
