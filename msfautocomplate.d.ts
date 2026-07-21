export interface MSFautocomplateSeverSide {
  url: string;
  headers: Array<Array<string>>;
}
export interface MSFautocomplateDataList {
  id: string;
  name: string;
}
export interface MSFautocomplateSettings {
  width?: string;
  height?: string;
  className?: string;
  severSide?: MSFautocomplateSeverSide;
  dataList?: Array<MSFautocomplateDataList>;
  onSelected?: (
    id: string | number;
    name: string;
    instance: MSFautocomplate;
  ) => void;
}
export declare class MSFautocomplate {
  constructor(select: Element, settings?: MSFautocomplateSettings);
  getSelectedData(): { id: string; name: string } | null;
}
