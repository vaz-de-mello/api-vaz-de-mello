import { PageDto } from "./page.dto";

export class PageQueryDto<q> {
    query: q;
    page: PageDto;
}