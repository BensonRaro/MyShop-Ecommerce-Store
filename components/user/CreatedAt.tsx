"use client";

import Moment from "react-moment";

const CreatedAt = ({ createdAt }: { createdAt: Date | undefined }) => {
  return (
    <div className="border border-gray-300/90 p-2 rounded-md opacity-50">
      <Moment format="D MMM YYYY" withTitle>
        {createdAt}
      </Moment>
    </div>
  );
};

export default CreatedAt;
