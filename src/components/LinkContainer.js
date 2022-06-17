import "../components/LinkContainer.css";

import { Button } from "@mui/material";

const LinkContainer = props => {
  console.log(props.displayImage);
  console.log(props.url);
  if (props.displayImage) {
    console.log("IMAGE YAY!");
    return (
      <div
        className="linkbox"
        style={{
          backgroundImage: `url(${props.displayImage})`,
          margin: "20px",
        }}
      >
        <Button
          className="gradient"
          variant="text"
          href={`${props.url}`}
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: "xx-large",
          }}
        >
          {props.displayText}
        </Button>
      </div>
    );
  }
  console.log("no image to display so show display text");
};

export default LinkContainer;
