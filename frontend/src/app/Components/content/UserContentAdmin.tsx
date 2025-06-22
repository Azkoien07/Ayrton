'use client'
import { useState } from "react"
import { cn } from '@utilities/utils';
import { DashboardProps, roleOptions } from '@Types/dashboard';
import { Eye, User, Calendar, Phone, Mail } from 'lucide-react';

export default function UserContentAdmin({ role }: DashboardProps) {
    const [patients] = useState([
        {
            id: 1,
            name: "Juan Pérez",
            age: 30,
            phone: "3001234567",
            email: "juan.perez@email.com",
            Tipoplan: "Premium",
            pqrs: "0",
            condition: "Saludable",
            status: "Activo"
        },
        {
            id: 2,
            name: "Ana Gómez",
            age: 25,
            phone: "3019876543",
            email: "ana.gomez@email.com",
            Tipoplan: "Platinum",
            pqrs: "5",
            condition: "En tratamiento",
            status: "Inactivo"
        }
    ]);

    function handleViewPatient(patient: { id: number; name: string; age: number; phone: string; email: string;  Tipoplan: string; condition: string; status: string; }): void {
        alert(
            `Detalles del paciente:\n\n` +
            `Nombre: ${patient.name}\n` +
            `Edad: ${patient.age} años\n` +
            `Teléfono: ${patient.phone}\n` +
            `Correo: ${patient.email}\n` +
            `Tipoplan: ${patient.Tipoplan}\n` +
            `Condición: ${patient.condition}\n` +
            `Estado: ${patient.status}`
        );
    }

    function getStatusColor(status: string) {
        switch (status.toLowerCase()) {
            case "activo":
                return "bg-green-100 text-green-800";
            case "inactivo":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    }

    return(
        <div>

            {/* Seccion de cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                      <User className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Usuarios</p>
                <p className="text-2xl font-bold text-gray-900">50</p>
              </div>
            </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Usuarios Activos</p>
                    <p className="text-2xl font-bold text-gray-900">45</p>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
                <Calendar className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">PQRS</p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
            </div>
        </div>
        </div>

        {/*Tabla de usuarios*/}
        <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Usuarios</h2>
        </div>
        </div>
        <div className="overflow-x-auto">
                 <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuarios
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Correo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                   tipo de plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    pqrs
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {patient.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {patient.age} años
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Phone className="h-4 w-4 mr-1 text-gray-400" />
                        {patient.phone}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <Mail className="h-4 w-4 mr-1 text-gray-400" />
                        {patient.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(patient. Tipoplan).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.pqrs}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewPatient(patient)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors mr-2"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalles
                      </button>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
        </div>
    )
}
