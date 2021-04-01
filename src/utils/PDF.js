import React from "react";
import * as jsPDF from 'jspdf'

function PDF(props) {

    const amount = props.reservationDetails
        .map((reservationDetail) => reservationDetail.meterReserved * reservationDetail.space.meterPrice + reservationDetail.tableReserved * reservationDetail.space.tablePrice)
        .reduce((total, currentValue) => total + currentValue);
    const montant = "Montant = "+amount
    const montantRemise = (props) => {
        if(props.discount !== 0){
            return("Montant remisé = "+amount + " - "+ props.discount+" = "+(amount-props.discount))
        }
        else{
            return ""
        }
    }
    const returnPrice = (props) => {
        let somme = 0
        for(let i=0; i<props.gameMonitorings.length; i++){
            somme+=props.gameMonitorings[i].returnedPrice
        }
        return somme
    }
    console.log(returnPrice(props))

    const retourJeux = (props) => {
        if(returnPrice(props) !== '0'){
            return ("Montant total = "+ (amount-props.discount+returnPrice(props))+" avec coûts de retour des jeux( "+returnPrice(props)+" euros)")
        }else{
            return ""
        }
    }
    console.log(retourJeux(props))
    return(
        `<div id="Post">
            <h2>Facture</h2>
            <h3>Exposant : ${props.exhibitorMonitoring.exhibitor.name}</h3>
            <Table striped bordered hover size={"xl"}>
                <thead>
                <tr>
                    <th></th>
                    <th>tables</th>
                    <th>Prix table</th>
                    <th>m2</th>
                    <th>Prix m2</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                ${
            props.reservationDetails.map(reservationDetail => {
                return (
                    `<tr>
                                <td>${reservationDetail.space.label}</td>
                                <td>${reservationDetail.tableReserved}</td>
                                <td>${reservationDetail.space.tablePrice}</td>
                                <td>${reservationDetail.meterReserved}</td>
                                <td>${reservationDetail.space.meterPrice}</td>
                                <td>${reservationDetail.tableReserved * reservationDetail.space.tablePrice + reservationDetail.meterReserved * reservationDetail.space.meterPrice}</td>
                            </tr>`
                )
            })
        }
                </tbody>
            </Table>
            <p>${montant}</p>
            <p>${montantRemise(props)}</p>
            <p>${retourJeux(props)}</p>
        </div>`)
}
const pdf ={

    demoFromHTML : (props) => {

        const pdf = new jsPDF('p', 'pt', 'letter');
        // source can be HTML-formatted string, or a reference
        // to an actual DOM element from which the text will be scraped.

        let source = PDF(props)

        // we support special element handlers. Register them with jQuery-style
        // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        // There is no support for any other type of selectors
        // (class, of compound) at this time.
        let specialElementHandlers = {
            // element with id of "bypass" - jQuery style selector
            '#bypassme': function (element, renderer) {
                // true = "handled elsewhere, bypass text extraction"
                return true
            }
        };
        let margins = {
            top: 80,
            bottom: 60,
            left: 40,
            width: 600
        };
        // all coords and widths are in jsPDF instance's declared units
        // 'inches' in this case

        pdf.setFont("helvetica")
        pdf.setFontType("bold")
        pdf.setFontSize(9)

        pdf.fromHTML(
            source, // HTML string or DOM elem ref.
            10, // x coord
            5, { // y coord
                'width': margins.width, // max width of content on PDF
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF
                //          this allow the insertion of new lines after html
                pdf.save('Facturation.pdf');
            }, margins);

    }

}
export default pdf;
