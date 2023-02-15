@isTest
public class EmpleadoControllerTest {

    @isTest
    static void testFetchEmpleados() {
        // Crear la informacion para testear
       	Oficina__c of1 = new Oficina__c(Name = 'Oficina Test');
        insert of1;
        Departamento__c dp1 = new Departamento__c (Nombre_de_Departamento__c = 'Legal', Oficina__c=of1.Id);
        insert dp1;
        Empleado__c emp1 = new Empleado__c( Nombre__c = 'John', Apellido__c = 'Doe', Departamento__c=dp1.Id, E_mail__c = 'jdoe@test.com', Estado__c = 'Contratado', Fecha_de_Contratacion__c = Date.today());
        insert emp1;
        
        // Llamada al metodo a probar
        Test.startTest();
        List<Empleado__c> empList = EmpleadoController.fetchEmpleados();
        Test.stopTest();
        
        // Verificar el resultado
        System.assertEquals(1, empList.size());
        Empleado__c emp = empList[0];
        System.assertEquals(emp1.Id, emp.Id);
        System.assertEquals(emp1.Nombre__c, emp.Nombre__c);
        System.assertEquals(emp1.Apellido__c, emp.Apellido__c);
        System.assertEquals(emp1.E_mail__c, emp.E_mail__c);
        System.assertEquals(emp1.Estado__c, emp.Estado__c);
        System.assertEquals(emp1.Fecha_de_Contratacion__c, emp.Fecha_de_Contratacion__c);
    }
}