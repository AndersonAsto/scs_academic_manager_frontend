import { StyleDictionary } from 'pdfmake/interfaces';

export const pdfStyles: StyleDictionary = {

    title: {
        fontSize: 18,
        bold: true,
        color: '#1f2a1c',
        margin: [0, 0, 0, 10]
    },

    subtitle: {
        fontSize: 14,
        bold: true,
        color: '#4f7a42',
        margin: [0, 18, 0, 8]
    },

    label: {
        fontSize: 10,
        bold: true,
        color: '#777'
    },

    value: {
        fontSize: 11
    },

    sectionHeader: {
        fillColor: '#4f7a42',
        color: 'white',
        bold: true,
        fontSize: 12,
        margin: [0, 12, 0, 6]
    }

};