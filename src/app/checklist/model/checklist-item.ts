export interface IChecklistItem {
  title: string;
  description: string;
  checked: boolean;
}

export interface IChecklistGroup {
  group: string;
  items: IChecklistItem[];
}
