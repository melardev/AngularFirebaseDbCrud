export class PageMeta {
  has_prev_page: boolean;
  has_next_page: boolean;
  current_page_number: number;
  current_page_url: string;
  next_page_number: number;
  prev_page_number: number;
  next_page_url: string;
  offset: number;
  requested_page_size: number;
  current_items_count: number;
  number_of_pages: number;
  total_items_count: number;
};

export class BaseAppResponse {
  constructor() {

  }

  success: boolean;
  full_messages: string[];
}

// Only for readability
export class ErrorAppResponse extends BaseAppResponse {
  success = false;
}

// Only for readability
export class SuccessAppResponse extends BaseAppResponse {
  success = true;
}


export class PagedResponse extends BaseAppResponse {
  page_meta: PageMeta;
}
