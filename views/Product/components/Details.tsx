import * as React from "react";

// components
import Card from "components/common/Card/Card";

interface DetailsProps {
  description?: string;
}

const Details = (props: DetailsProps) => {
  const { description } = props;
  return (
    <Card className="details">
      <h4 className="details__title">Details</h4>
      <div className="details__table-wrap">
        <table className="details__table">
          <tbody>
            <tr>
              <td>Trademark</td>
              <td>{description || "Lorem isum"}</td>
            </tr>
            <tr>
              <td>Origin</td>
              <td>Viet Nam</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default Details;
