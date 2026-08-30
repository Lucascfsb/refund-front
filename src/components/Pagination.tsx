import leftSvg from "../assets/left.svg";
import rightSvg from "../assets/right.svg";

import { Button } from "./Button";

type Props = {
  current: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
};

export function Pagination({ current, total, onNext, onPrev }: Props) {
  return (
    <div className="flex flex-1 justify-center items-center gap-2">
      <Button variant="iconSmall" onClick={onPrev} disabled={current === 1}>
        <img src={leftSvg} alt="Página anterior" />
      </Button>

      <span className="text-gray-200 text-sm">
        {current} de {total}
      </span>

      <Button variant="iconSmall" onClick={onNext} disabled={current === total}>
        <img src={rightSvg} alt="Próxima página" />
      </Button>
    </div>
  );
}
