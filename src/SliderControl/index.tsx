import classes from "./index.module.scss";
import Slider from "@mui/material/Slider";

interface SliderControlProps {
  value: number;
  onChange: (event: Event, value: number) => void;
  options?: { ariaLabel?: string; min?: number; max?: number };
}

const defaultSliderOptions = {
  ariaLabel: "Slider control",
  min: 1,
  max: 15,
};

const SliderControl: React.FC<SliderControlProps> = (props) => {
  const options = {
    ...defaultSliderOptions,
    ...props.options,
  } as typeof defaultSliderOptions;

  const handleSliderChange = (event: Event, value: number | number[]) => {
    if (typeof value === "number") props.onChange(event, value);
  };

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>{options.ariaLabel}</h2>
      <Slider
        max={options.max}
        min={options.min}
        step={0.1}
        aria-label={options.ariaLabel}
        valueLabelDisplay="auto"
        onChange={handleSliderChange}
        value={props.value}
      />
    </div>
  );
};

export default SliderControl;
