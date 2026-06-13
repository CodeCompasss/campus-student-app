export type BusItem = {
  slug: string;
  name: string;
  pdfUrl?: string; // optional placeholder PDF
};

export const busData: BusItem[] = [
  {
    slug: 'bus-1',
    name: 'Bus 1 (Mannarkkad)',
    // Placeholder PDF; replace with /pdfs/bus-1.pdf in public/ when ready
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'bus-2',
    name: 'Bus 2 (Olavakkode)',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'bus-3',
    name: 'Bus 3 (Pathirippala)',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'bus-4',
    name: 'Bus 4(Pattambi)',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'mannpatta-to-palakkad',
    name: 'Mannpatta to Palakkad (private)',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'mannpatta-to-skp',
    name: 'Mannpatta to SKP (Private) ',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    slug: 'skp-to-otp',
    name: 'SKP to Ottappalam (Private)',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
   {
    slug: 'skp-to-shr',
    name: 'SKP to Shornnur (Private) ',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
];
