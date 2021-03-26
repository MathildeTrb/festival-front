import {createContext, FC, useEffect, useState} from "react";
import useAxios from "../../utils/useAxios";
import {Company} from "../../utils/types";
import {Col, Form, InputGroup, Row, Spinner} from "react-bootstrap";
import {VscDiffAdded} from "react-icons/vsc";
import {GiClick} from "react-icons/all";
import CompanyRow from "./CompanyRow";
import CompanyCreateModal from "./CompanyCreateModal";
import {BsSearch} from "react-icons/bs";

type CompanyContextProps = {
    companies: Company[];
    setCompanies: (companies?: Company[]) => void;
}

export const CompanyContext = createContext<CompanyContextProps>({} as CompanyContextProps);

const Companies: FC = () => {

    const {data: companies, isPending, setData: setCompanies} = useAxios<Company[]>("companies");

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);

    const [filterInput, setFilterInput] = useState<string>("");

    const [yesButton, setYesButton] = useState<boolean>(true);
    const [noButton, setNoButton] = useState<boolean>(true);

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

                <Row>
                    <Col md="4">
                        <button type="button" className="mon-button mb-2" onClick={() => setShowModalCreate(true)}><p>
                            <VscDiffAdded/> Ajout d'une entreprise</p></button>
                        <CompanyCreateModal show={showModalCreate} onHide={() => setShowModalCreate(false)}/>
                    </Col>
                    <Col md="4"/>
                    <Col>
                        <InputGroup className="mb-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text><BsSearch/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="text" value={filterInput}
                                          onChange={event => setFilterInput(event.target.value)}/>
                        </InputGroup>
                    </Col>
                </Row>

                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Mail</th>
                        <th scope="col">Adresse</th>
                        <th scope="col">
                            Exposant potentiel
                            <button type="button" onClick={() => setYesButton(!yesButton)} className={`button-design ml-1 ${yesButton ? "icon-bg-color-yes" : ""}`}>Oui</button>
                            <button type="button" onClick={() => setNoButton(!noButton)} className={`button-design ml-1 ${noButton ? "icon-bg-color-no" : ""}`}>No</button>
                        </th>
                        <th scope="col">Contacts <GiClick/></th>
                        <th scope="col">Jeux <GiClick/></th>
                        <th scope="col"/>
                        <th scope="col"/>
                    </tr>
                    </thead>
                    <tbody>
                    {companies
                        .filter(company => company.name.toLowerCase().includes(filterInput.toLowerCase()))
                        .filter(company => (company.canBeExhibitor && yesButton) || (!company.canBeExhibitor && noButton))
                        .map((company, index) => <CompanyRow key={index} company={company}/>)}
                    </tbody>
                </table>

            </CompanyContext.Provider>
            }
        </div>
    )
}

export default Companies;
