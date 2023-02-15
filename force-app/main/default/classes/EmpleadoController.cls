public class EmpleadoController {
    @AuraEnabled( cacheable = true )
    public static List<Empleado__c> fetchEmpleados(){
        return [
            SELECT Id, Name, Nombre__c, Apellido__c, E_mail__c, Estado__c, Fecha_de_Contratacion__c,
                (SELECT Nivel_Academico__c 
                FROM Historiales_Academico__r), 
                    (SELECT Experiencia_en_anos__c, Cargo__c 
                    FROM Experiencias_Laborales__r) 
            FROM Empleado__c
        ];
    }
}