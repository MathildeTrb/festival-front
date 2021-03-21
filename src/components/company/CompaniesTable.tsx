import {FC} from "react";
import {Company} from "../../utils/types";

type CompaniesTableProps = {
    companies: Company[];
}

const CompaniesTable: FC<CompaniesTableProps> = ({companies}) => {
    return (
        <>
            Bonjour
        </>
    )
}

export default CompaniesTable;
