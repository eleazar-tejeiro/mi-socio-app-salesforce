import { LightningElement, wire } from 'lwc';
import fetchEmpleados from '@salesforce/apex/EmpleadoController.fetchEmpleados';
import { NavigationMixin } from 'lightning/navigation';

const actions = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
];

 
const columns = [
    { label: 'Nombre', fieldName: 'Nombre__c' },
    { label: 'Apellido', fieldName: 'Apellido__c' },
    { label: 'E-mail', fieldName: 'E_mail__c' },
    { label: 'Estado', fieldName: 'Estado__c' },
    { label: 'Fecha de contrato', fieldName: 'Fecha_de_Contratacion__c' },
    {
      type: 'action',
      typeAttributes: { rowActions: actions },
    },
  ];

export default class GeneradorDeReportesEmpleados extends NavigationMixin( LightningElement ) {
     
    availableEmpleados;
    error;
    columns = columns;
    searchString;
    initialRecords;
    

    @wire( fetchEmpleados )  
    wiredAccount( { error, data } ) {

        if ( data ) {

            this.availableEmpleados = data;
            this.initialRecords = data;
            this.error = undefined;

        } else if ( error ) {

            this.error = error;
            this.availableEmpleados = undefined;

        }

    }

    handleRowAction( event ) {

        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch ( actionName ) {
            case 'view':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        actionName: 'view'
                    }
                });
                break;
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: 'Empleado__c',
                        actionName: 'edit'
                    }
                });
                break;
            default:
        }

    }

    handleSearchChange( event ) {

        this.searchString = event.detail.value;
        console.log( 'Updated Search String is ' + this.searchString );

    }

    handleSearch( event ) {

        const searchKey = event.target.value.toLowerCase();
        console.log( 'Search String is ' + searchKey );

        if ( searchKey ) {

            this.availableEmpleados = this.initialRecords;
            console.log( 'Account Records are ' + JSON.stringify( this.availableEmpleados ) );
            
            if ( this.availableEmpleados ) {

                let recs = [];
                
                for ( let rec of this.availableEmpleados ) {

                    console.log( 'Rec is ' + JSON.stringify( rec ) );
                    let valuesArray = Object.values( rec );
                    console.log( 'valuesArray is ' + JSON.stringify( valuesArray ) );
 
                    for ( let val of valuesArray ) {

                        console.log( 'val is ' + val );
                        let strVal = String( val );
                        
                        if ( strVal ) {

                            if ( strVal.toLowerCase().includes( searchKey ) ) {

                                recs.push( rec );
                                break;
                        
                            }

                        }

                    }
                    
                }

                console.log( 'Matched Accounts are ' + JSON.stringify( recs ) );
                this.availableEmpleados = recs;

             }
 
        }  else {

            this.availableEmpleados = this.initialRecords;

        }        

    }

}