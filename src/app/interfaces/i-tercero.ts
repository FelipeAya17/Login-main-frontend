export interface ITercero{
    id: number;
    user_id: number;
    tipo_documento_id: number;
    numero_documento: number;
    nombre_tipo_documento: string;
    nombres: string;
    apellidos: string;
    correo_electronico: string;
    numero_telefonico: number;
    numero_celular: number;
    nombre_perfil: string;
    fecha_registro: Date;
    activo: boolean;
    usuario_crea: string;
}