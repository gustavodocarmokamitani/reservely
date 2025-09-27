import api from '../axiosInstance';
import { Appointment } from '../models/Appointment';

export const getAppointments = async () => {
    try {
        const response = await api.get('Appointment');
        return response.data;
    } catch (error) {
        console.error("Error getting Appointments:", error);
        throw error;
    }
};

export const getAppointmentById = async (id: number) => {
    try {
        const response = await api.get(`Appointment/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting Appointment:", error);
        throw error;
    }
}; 

export const getAppointmentHistoryById = async (id: number) => {
    try {
        const response = await api.get(`Appointment/client/${id}/history-details`);
        return response.data;
    } catch (error) {
        console.error("Error getting Appointment:", error);
        throw error;
    }
};

export const GetEmployeePerformance = async (storeId: number) => {
    try {
        const response = await api.get(`Appointment/employee-performance/${storeId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting Performance Employee:", error);
        throw error;
    }
};

export const getAppointmentRevenue = async (storeId: number) => {
    try {
        const response = await api.get(`Appointment/revenue/${storeId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting Appointment Revenue:", error);
        throw error;
    }
};

export const getAppointmentStatusCount = async (storeId: number) => {
    try {
        const response = await api.get(`Appointment/status-count/${storeId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting Appointment Status Count:", error);
        throw error;
    }
};

export const getAppointmentMostRequestedServices = async (storeId: number) => {
    try {
        const response = await api.get(`Appointment/most-requested-services/${storeId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting Appointment Most Requested Services:", error);
        throw error;
    }
};

export const getAppointmentByDay = async (storeId: number) => {
    try {
        const response = await api.get(`Appointment/appointments-by-day/${storeId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting Appointment by Day:", error);
        throw error;
    }
};

export const getAppointmentByEmployeeId = async (id: number) => {
    try {
        const response = await api.get(`Appointment/employee/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting Appointment by Employee ID:", error);
        return;
    }
};

export const getAppointmentByStoreId = async (id: number) => {
    try {
        const response = await api.get(`Appointment/store/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting Appointment by Store ID:", error);
        return;
    }
};

export const getValidateAppointment = async (
    id: number,
    appointmentDate: Date,
    appointmentTime: string,
    serviceIds: string
): Promise<boolean | undefined> => {
    try {
        const formattedDate = appointmentDate.toISOString().split("T")[0];  
        
        const response = await api.get(`Appointment/validate-appointment`, {
            params: {
                employeeId: id,
                appointmentDate: formattedDate,
                appointmentTime: appointmentTime,
                serviceIds: serviceIds
            }
        });

        return response.data;
    } catch (error) {
        console.error("Erro ao validar agendamento:", error);
        return undefined;
    }
};


export const createAppointment = async (AppointmentData: Appointment[]) => {
    try {
        const response = await api.post('Appointment', AppointmentData);
        return response.data;
    } catch (error) {
        console.error("Error creating Appointment:", error);
        throw error;
    }
};

export const updateAppointment = async (id: number, AppointmentData: Appointment) => {
    try {
        const response = await api.put(`Appointment/${id}`, AppointmentData);
        return response;
    } catch (error) {
        console.error("Error updating Appointment:", error);
        throw error;
    }
};

export const deleteAppointment = async (id: number) => {
    try {
        const response = await api.delete(`Appointment/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting Appointment:", error);
        throw error;
    }
};

export const getAppointmentByClienteId = async (clienteId: number) => {
    try {
        const response = await api.get(`Appointment/client/${clienteId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting Appointment with cliente:", error);
        throw error;
    }
};
