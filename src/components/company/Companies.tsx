import {createContext, FC, useEffect, useState} from "react";
import useAxios from "../../utils/useAxios";
import {Company} from "../../utils/types";
import {Spinner} from "react-bootstrap";
import {VscDiffAdded} from "react-icons/vsc";
import {GiClick} from "react-icons/all";
import CompanyRow from "./CompanyRow";
import CompanyCreateModal from "./CompanyCreateModal";
import axios from "../../utils/axios";

type CompanyContextProps = {
    companies: Company[];
    setCompanies: (companies: Company[]) => void;
}

export const CompanyContext = createContext<CompanyContextProps>({} as CompanyContextProps);

const Companies: FC = () => {

    const {data: companies, isPending, setData: setCompanies} = useAxios<Company[]>("companies");

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);

    const onCreate = (company: Company) => {
        axios.post("companies", {
            company
        })
            .then(({data: newCompany}) => {

                const updatedCompanies = [...companies, newCompany];
                updatedCompanies.sort((c1, c2) => c1.name.localeCompare(c2.name))

                setCompanies(updatedCompanies);

                setShowModalCreate(false);
            })
    }


    const onDeleteCompany = (company: Company) => {
        console.log(company)
    }

    useEffect(() => {
        document.title = "Liste des entreprises";
    })

    const value = {companies, setCompanies};

    return (
        <div>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {companies &&
            <CompanyContext.Provider value={value}>

                <h1 className="text-center mb-5">
                    Liste des entreprises
                </h1>

                <div>
                    <button type="button" className="mon-button mb-2" onClick={() => setShowModalCreate(true)}><p>
                        <VscDiffAdded/> Ajout d'une entreprise</p></button>
                    <CompanyCreateModal show={showModalCreate} onHide={() => setShowModalCreate(false)}/>
                </div>

                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Mail</th>
                        <th scope="col">Adresse</th>
                        <th scope="col">Exposant potentiel</th>
                        <th scope="col">Contacts <GiClick/></th>
                        <th scope="col">Jeux <GiClick/></th>
                        <th scope="col"/>
                        <th scope="col"/>
                    </tr>
                    </thead>
                    <tbody>
                    {companies.map((company, index) => <CompanyRow key={index} company={company}
                                                                   onDelete={onDeleteCompany}/>)}
                    </tbody>
                </table>

            </CompanyContext.Provider>
            }
        </div>
    )
}

export default Companies;