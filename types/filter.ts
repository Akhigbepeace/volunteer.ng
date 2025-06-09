type FilterOption = {
  value: string;
  label: string;
};

type FilterState = {
  cause: string[];
  skills: string[];
  type: string[];
  location: string[];
};

type FilterSection = {
  title: string;
  key: keyof FilterState;
  options?: FilterOption[];
  customComponent?: React.ComponentType<FilterComponentProps>;
};

type FilterComponentProps = {
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
};

export interface ProjectsApiParams extends FilterState {
  page: number;
  limit: number;
}

type ApiResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type TypeCategory = {
  heading: string;
  options?: FilterOption[];
  value?: string;
  description?: string;
};

export type {
  ApiResponse,
  FilterComponentProps,
  FilterOption,
  FilterSection,
  FilterState,
  TypeCategory,
};
