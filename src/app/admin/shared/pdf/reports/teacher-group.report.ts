import { TeacherGroup } from "../../../teacher-groups/teacher-groups.model";
import { pdfStyles } from "../pdf.styles";

export function buildTeacherGroupReport(
    teacherGroup: TeacherGroup
) {

    return {

        pageSize: 'A4',

        pageMargins: [40, 40, 40, 40],

        styles: pdfStyles,

        content: [
            {
                text: 'REPORTE DE GRUPO DE DOCENTE',
                style: 'title'
            },

            {
                text: `ID: ${teacherGroup.id}`
            },

            {
                text: `Tutor: ${teacherGroup.tutor ? 'Sí' : 'No'}`
            },

            {
                text: `Tutor: ${teacherGroup.tutor ? 'Sí' : 'No'}`
            },

            {
                text: `Curso: ${teacherGroup.course.course}`
            },

            {
                text: `Grado: ${teacherGroup.grade.grade}`
            },

            {
                text: `Sección: ${teacherGroup.section.section}`
            }
        ]

    };

}