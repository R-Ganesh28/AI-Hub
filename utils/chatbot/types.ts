export interface Template {
  name: string;
  desc: string;
  category: string;
  icon: string;
  aiPrompt: string;
  slug: string;
  form: Form[];
}

interface Form {
  label: string;
  field: string;
  name: string;
  required: boolean;
}

export interface QueryResponse {
  queries: any[];
  totalPages: number;
}

interface TableQueryResponse {
  _id: string;
  template: any;
  email: string;
  prompt: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Props {
  data: TableQueryResponse[];
}
