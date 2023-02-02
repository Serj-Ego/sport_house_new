import { StatusConst } from "./StatusConst";

export const statusColorSwitch = (statusName) => {
  switch (statusName) {
    case StatusConst.ARCHIVE:
      return "#34495e";
    case StatusConst.PUBLISHED:
      return "#2ecc71";
    case StatusConst.CREATED:
      return "#3498db";
    case StatusConst.REVIEW:
      return "#9b59b6";
    case StatusConst.DRAFT:
      return "#95a5a6";
    case StatusConst.CONFIRMED:
      return "#1abc9c";
    case StatusConst.REJECTED:
      return "#e74c3c";
    default:
      return "#f1c40f";
  }
};
