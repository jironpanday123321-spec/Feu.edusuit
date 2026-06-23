import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Generate a Certificate of Registration (COR) PDF
 * Pixel-perfect replica of the FEU COR document.
 */
export function generateCOR(data) {
  // Letter size: 612 x 792 pt  (8.5 x 11 in)
  // We use a slightly taller page to fit all content
  const doc = new jsPDF({ unit: 'pt', format: [612, 950] });
  const pw  = doc.internal.pageSize.getWidth();   // 612
  const ml  = 45;   // margin left
  const mr  = 45;   // margin right

  let y = 40;

  // ── tiny helpers ─────────────────────────────────────────────
  const setFont = (style = 'normal', size = 9, r = 0, g = 0, b = 0) => {
    doc.setFont('Helvetica', style);
    doc.setFontSize(size);
    doc.setTextColor(r, g, b);
  };

  const hline = (yy, x1 = ml, x2 = pw - mr, weight = 0.5, r = 0, g = 0, b = 0) => {
    doc.setDrawColor(r, g, b);
    doc.setLineWidth(weight);
    doc.line(x1, yy, x2, yy);
  };

  // ═══════════════════════════════════════════════════════════
  // 1.  DISCLAIMER + RUN INFO
  // ═══════════════════════════════════════════════════════════
  setFont('bold', 8, 180, 0, 0);
  doc.text('DISCLAIMER: Fees are subject to change upon final enrollment registration.', ml, y);
  setFont('normal', 8, 60, 60, 60);
  doc.text(`User: ${data.studentNo}`, pw - mr, y, { align: 'right' });

  y += 12;
  setFont('bold', 8, 180, 0, 0);
  doc.text('Late enrollment fees are not yet included', ml, y);
  setFont('normal', 8, 60, 60, 60);
  doc.text(`Run Date: ${data.runDate}`, pw - mr, y, { align: 'right' });

  y += 30;

  // ═══════════════════════════════════════════════════════════
  // 2.  TITLE BLOCK
  // ═══════════════════════════════════════════════════════════
  setFont('bold', 14, 0, 0, 0);
  doc.text('Certificate of Registration', pw / 2, y, { align: 'center' });
  y += 17;
  setFont('normal', 10);
  doc.text(data.semesterLabel, pw / 2, y, { align: 'center' });
  y += 14;
  setFont('bold', 10);
  doc.text(data.institute, pw / 2, y, { align: 'center' });

  y += 35;

  // ═══════════════════════════════════════════════════════════
  // 3.  STUDENT INFO BLOCK
  // ═══════════════════════════════════════════════════════════
  setFont('normal', 9.5);
  doc.text(`Transaction No: ${data.transactionNo}`, ml, y);
  y += 14;
  doc.text(`Student No: ${data.studentNo}`, ml, y);
  setFont('normal', 9.5);
  doc.text(`Program: ${data.program}`, pw - mr, y, { align: 'right' });
  y += 14;
  doc.text(`Student Name: ${data.studentName}`, ml, y);
  y += 14;
  doc.text(`Block No.:  Post Date: ${data.postDate}`, ml, y);

  y += 20;

  // ═══════════════════════════════════════════════════════════
  // 4.  COURSES TABLE
  // ═══════════════════════════════════════════════════════════
  const courseHead = [['Course Code', 'Section Code', 'Units Building Room', 'Day', 'Time', 'Faculty']];
  const courseBody = data.courses.map(c => [
    c.courseCode,
    c.sectionCode,
    `${c.units.toFixed(1)} ${c.building} ${c.room}`,
    c.day,
    c.time,
    c.faculty,
  ]);

  autoTable(doc, {
    startY: y,
    margin: { left: ml, right: mr },
    head: courseHead,
    body: courseBody,
    theme: 'plain',
    styles: {
      font: 'Helvetica',
      fontSize: 8.5,
      cellPadding: { top: 5, bottom: 5, left: 2, right: 2 },
      textColor: [0, 0, 0],
      overflow: 'linebreak',
    },
    headStyles: {
      fontStyle: 'bold',
      fontSize: 8.5,
    },
    columnStyles: {
      0: { cellWidth: 65 },
      1: { cellWidth: 135 },
      2: { cellWidth: 100, halign: 'center' },
      3: { cellWidth: 35,  halign: 'center' },
      4: { cellWidth: 110, halign: 'center' },
      5: { cellWidth: 'auto', halign: 'left' },
    },
    didDrawCell: (hook) => {
      const bottom = hook.cell.y + hook.cell.height;
      if (hook.section === 'head') {
        hline(bottom, ml, pw - mr, 0.8, 0, 0, 0);
      } else if (hook.section === 'body') {
        hline(bottom, ml, pw - mr, 0.25, 180, 180, 180);
      }
    },
  });

  y = doc.lastAutoTable.finalY + 12;

  // ── Total Units ──
  setFont('bold', 10.5);
  doc.text(`Total Units: ${data.totalUnits.toFixed(2)}`, pw / 2, y, { align: 'center' });

  y += 30;

  // ═══════════════════════════════════════════════════════════
  // 5.  CHARGES SECTION
  // ═══════════════════════════════════════════════════════════
  setFont('bold', 10);
  doc.text('Charges', ml, y);
  y += 16;

  setFont('bold', 9);
  doc.text('Date', ml, y);
  doc.text('Transaction', ml + 80, y);
  y += 5;
  hline(y, ml, ml + 265, 0.5);
  y += 13;

  setFont('normal', 9);
  data.charges.forEach(c => {
    doc.text(c.date || '', ml, y);
    doc.text(c.transaction, ml + 80, y);
    y += 12;
  });

  y += 20;

  // ═══════════════════════════════════════════════════════════
  // 6.  OPTION II — CASH BASIS
  // ═══════════════════════════════════════════════════════════
  setFont('bold', 10);
  doc.text('OPTION II: ', ml, y);
  let cx = ml + doc.getTextWidth('OPTION II: ');
  setFont('bold', 10, 180, 0, 0);
  doc.text('(CASH BASIS)', cx, y);
  cx += doc.getTextWidth('(CASH BASIS)');
  setFont('bold', 10, 0, 0, 0);
  doc.text(' END OF SEMESTER', cx, y);

  y += 14;
  setFont('normal', 8);
  doc.text('The above Payment Schedule Options are based on the Current Term Assessment and', ml, y);
  y += 11;
  doc.text('may differ from actual payment schedule if there are previous balance and other', ml, y);
  y += 11;
  doc.text('adjustments.', ml, y);

  y += 18;
  const cashStartY = y;

  // Left column: labels + amounts
  setFont('normal', 9.5);
  data.cashBasis.forEach(item => {
    doc.text(item.label, ml + 5, y);
    if (item.amount) {
      doc.text(item.amount, ml + 240, y);
    }
    y += 17;
  });

  // Right column: red discount note
  if (data.cashDiscountNote) {
    setFont('normal', 7, 180, 0, 0);
    const maxW = 195;
    const noteLines = doc.splitTextToSize(data.cashDiscountNote, maxW);
    noteLines.forEach((line, i) => {
      doc.text(line, pw - mr, cashStartY + i * 9, { align: 'right' });
    });
  }

  y += 20;

  // ═══════════════════════════════════════════════════════════
  // 7.  OPTION I — INSTALLMENT BASIS
  // ═══════════════════════════════════════════════════════════
  setFont('bold', 10);
  doc.text('OPTION I: (INSTALLMENT BASIS) ', ml, y);
  let ix = ml + doc.getTextWidth('OPTION I: (INSTALLMENT BASIS) ');
  setFont('bold', 10, 180, 0, 0);
  doc.text('ELIGIBLE ', ix, y);
  ix += doc.getTextWidth('ELIGIBLE ');
  setFont('normal', 10, 0, 0, 0);
  doc.text('This', ix, y);

  y += 14;
  setFont('normal', 9.5);
  doc.text('Installment is only for over the Counter ', ml, y);
  let cbtx = ml + doc.getTextWidth('Installment is only for over the Counter ');
  setFont('bold', 9.5, 180, 0, 0);
  doc.text('(CASH BASIS)', cbtx, y);

  y += 13;
  setFont('normal', 9.5, 0, 0, 0);
  doc.text('Not longer on the Payment Schedule Current Term', ml, y);
  y += 13;
  doc.text('Assessment:', ml, y);

  y += 20;

  // Installment rows
  const labelX   = ml + 10;
  const amountX  = ml + 185;
  const dateX    = ml + 320;

  data.installmentBasis.forEach(item => {
    if (item.strikethrough) {
      // Red bold label
      setFont('bold', 10, 180, 0, 0);
      doc.text(item.label, labelX, y);

      // Red amount with strikethrough
      const amtStr = `PHP  ${item.amount}`;
      doc.text(amtStr, amountX, y);
      const aw = doc.getTextWidth(amtStr);
      doc.setDrawColor(180, 0, 0);
      doc.setLineWidth(0.9);
      // Strikethrough line at mid-height of text
      const midY = y - 3.5;
      doc.line(amountX, midY, amountX + aw, midY);

      // Date — red
      if (item.date) {
        setFont('bold', 10, 180, 0, 0);
        doc.text(item.date, dateX, y);
      }
    } else if (item.isTotal) {
      setFont('bold', 10, 0, 0, 0);
      doc.text(item.label, labelX, y);
      doc.text(`PHP  ${item.amount}`, amountX, y);
    } else {
      setFont('normal', 10, 0, 0, 0);
      doc.text(item.label, labelX, y);
      doc.text(`PHP  ${item.amount}`, amountX, y);
      if (item.date) {
        setFont('normal', 10, 40, 40, 40);
        doc.text(item.date, dateX, y);
      }
    }
    y += 20;
  });

  // ── Save ──
  // Format: COR_LASTNAME_STUDENTNO  (e.g. COR_COMEDIAM_2022062691)
  const lastName = data.studentName.split(',')[0].trim().replace(/[^a-zA-Z0-9]/g, '');
  doc.save(`COR_${lastName}_${data.studentNo}.pdf`);
}

// ─────────────────────────────────────────────────────────────
// SAMPLE DATA — matches the screenshot exactly
// ─────────────────────────────────────────────────────────────
export const sampleCORData = {
  runDate:       '06/22/2026 10:22 AM',
  semesterLabel: 'First Semester, Academic Year SY 2025-2026',
  institute:     'INSTITUTE OF ARTS AND SCIENCES (IAS)',
  transactionNo: '0000959302',
  studentNo:     '2022062691',
  studentName:   'COMEDIAM, PATRICK',
  program:       'Bachelor of Science in Psychology',
  postDate:      '06/08/2026 12:12 PM',

  courses: [
    { courseCode: 'PSY2201', sectionCode: 'PSY2201-LEC-Sec4-MN', units: 2.0, building: 'SB', room: '208', day: 'M,T',   time: '10:30 AM – 12:30 PM', faculty: 'A. SALGADO'   },
    { courseCode: 'PSY2201', sectionCode: 'PSY2201-LAB-Sec4-MN', units: 3.0, building: 'SB', room: '304', day: 'TH,F',  time: '10:30 AM – 12:30 PM', faculty: 'A. SALGADO'   },
    { courseCode: 'PSY0310', sectionCode: 'PSY0310-LEC-Sec7-MN', units: 2.0, building: 'SB', room: '506', day: 'M,T',   time: '1:30 PM – 3:30 PM',   faculty: 'J. BUENAFLOR' },
    { courseCode: 'PSY0311', sectionCode: 'PSY0310-LAB-Sec7-MN', units: 3.0, building: 'SB', room: '204', day: 'W,S',   time: '10:00 AM – 1:00 PM',  faculty: 'J. BUENAFLOR' },
    { courseCode: 'PSY0102', sectionCode: 'PSY2203-LEC-Sec1-MN', units: 2.0, building: 'AB', room: '507', day: 'M,T',   time: '4:30 PM – 7:30 PM',   faculty: 'G. ATENDIDO'  },
    { courseCode: 'PSY0102', sectionCode: 'PSY0102-LAB-Sec1-MN', units: 3.0, building: 'SB', room: '404', day: 'W,S',   time: '1:30 PM – 4:30 PM',   faculty: 'M. SARMIENTO' },
    { courseCode: 'PSY0350', sectionCode: 'PSY0350-LEC-Sec2-MN', units: 2.0, building: 'AB', room: '308', day: 'TH,F',  time: '1:30 PM – 3:30 PM',   faculty: 'W. ONGSITCO'  },
    { courseCode: 'PSY0350', sectionCode: 'PSY0350-LEC-Sec9-MN', units: 3.0, building: 'AB', room: '304', day: 'W,S',   time: '4:30 PM – 7:30 PM',   faculty: 'W. ONGSITCO'  },
    { courseCode: 'WRP2022', sectionCode: 'WRP2022-LEC-Sec2-MN', units: 3.0, building: 'AB', room: '106', day: 'W,S',   time: '8:00 AM – 9:00 AM',   faculty: 'M. MABALACAT' },
  ],

  totalUnits: 23.00,

  charges: [
    { date: '06/05/2026', transaction: 'Initial Assessment'    },
    { date: '06/06/2026', transaction: 'Added Courses'         },
    { date: '',           transaction: 'Changed Courses'        },
    { date: '06/08/2026', transaction: 'Changed Section (5)'   },
    { date: '06/04/2026', transaction: 'Advanced Courses (3)'  },
    { date: '',           transaction: 'Dissolved Courses'      },
    { date: '',           transaction: 'Cancelled Registration' },
  ],

  cashBasis: [
    { label: 'Current Term Assessment',        amount: 'Php47,798.47' },
    { label: 'Less 30% Sibling Cash Discount', amount: ''             },
    { label: 'Net Amount Due',                 amount: 'Php47,798.47' },
  ],

  cashDiscountNote:
    'This 30% cash discount can be availed of, if any previous balance ' +
    'has been fully paid, and if the Net Amount Due is paid on or before ' +
    'the cash discount deadline*. (* refer to enrollment activities ' +
    'schedule via canvas)',

  installmentBasis: [
    { label: 'Down Payment',       amount: '12,000.000', date: '06/05/2026 – 2:48 PM', strikethrough: true  },
    { label: 'First Installment',  amount: '27,000.00',  date: '06/26/2026'                                 },
    { label: 'Second Installment', amount: '20,798.47',  date: '07/27/2026'                                 },
    { label: 'Total Amount Due',   amount: '47,798.47',  isTotal: true                                      },
  ],
};