import { IServicesService } from "../../../domain/services/service/interfaces/ServiceInterfaces";
import servicesService from "../../../domain/services/service/ServicesService";

class AuthController {
    private adminLogin: string;
    private adminPassword: string;
    private servicesService: IServicesService;

    constructor() {
        this.adminLogin = process.env.ADMIN_LOGIN || "admin";
        this.adminPassword = process.env.ADMIN_PASSWORD || "123456";
        this.servicesService = servicesService;
    }

    async handleLogin(request: any, reply: any) {
        const { login, password } = request.body as {
            login: string;
            password: string;
        };

        if (login !== this.adminLogin || password !== this.adminPassword) {
            return reply.status(401).send({ error: "Unauthorized" });
        }

        reply.status(200).send({ message: "Login successful" });
    }
}

const authController = new AuthController();
export default authController;
