import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Generate a Certificate of Registration (COR) PDF
 * Exact replica of the FEU COR document.
 * Uses a taller format (Legal) to ensure NO content is cut off.
 */
export function generateCOR(data) {
  // Use Legal size (8.5 x 14 inches / 612 x 1008 pt) to ensure everything fits without cutting
  const doc = new jsPDF({ unit: 'pt', format: [612, 1008] }); 
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const ml = 45;
  const mr = 45;

  let y = 50;

  // ── helpers ───────────────────────────────────────────────
  const font = (style = 'normal', size = 9, r = 0, g = 0, b = 0) => {
    doc.setFont('Helvetica', style);
    doc.setFontSize(size);
    doc.setTextColor(r, g, b);
  };

  const hr = (yy, x1 = ml, x2 = pw - mr, weight = 0.5, r = 0, g = 0, b = 0) => {
    doc.setDrawColor(r, g, b);
    doc.setLineWidth(weight);
    doc.line(x1, yy, x2, yy);
  };

  // ═══════════════════════════════════════════════════════════
  // 1.  DISCLAIMER & RUN INFO
  // ═══════════════════════════════════════════════════════════
  font('bold', 8.5, 180, 0, 0); // Red disclaimer
  doc.text('DISCLAIMER: Fees are subject to change upon final enrollment registration.', ml, y);
  
  font('normal', 8.5, 50, 50, 50); // Dark grey run info
  doc.text(`User: ${data.studentNo}`, pw - mr, y, { align: 'right' });
  
  y += 12;
  font('bold', 8.5, 180, 0, 0);
  doc.text('Late enrollment fees are not yet included', ml, y);
  
  font('normal', 8.5, 50, 50, 50);
  doc.text(`Run Date: ${data.runDate}`, pw - mr, y, { align: 'right' });

  y += 35;

  // ═══════════════════════════════════════════════════════════
  // 2.  TITLE BLOCK (Centered)
  // ═══════════════════════════════════════════════════════════
  font('bold', 14);
  doc.text('Certificate of Registration', pw / 2, y, { align: 'center' });
  y += 16;
  font('normal', 10);
  doc.text(data.semesterLabel, pw / 2, y, { align: 'center' });
  y += 14;
  font('bold', 10);
  doc.text(data.institute, pw / 2, y, { align: 'center' });

  y += 40;

  // ═══════════════════════════════════════════════════════════
  // 3.  STUDENT INFO
  // ═══════════════════════════════════════════════════════════
  font('normal', 9.5);
  doc.text(`Transaction No: ${data.transactionNo}`, ml, y);
  y += 14;
  doc.text(`Student No: ${data.studentNo}`, ml, y);
  doc.text(`Program: ${data.program}`, pw - mr, y, { align: 'right' });
  y += 14;
  doc.text(`Student Name: ${data.studentName}`, ml, y);
  y += 14;
  doc.text(`Block No.:  Post Date: ${data.postDate}`, ml, y);

  y += 25;

  // ═══════════════════════════════════════════════════════════
  // 4.  COURSE TABLE
  // ═══════════════════════════════════════════════════════════
  // Merged header to match screenshot
  const head = [['Course Code', 'Section Code', 'Units Building Room', 'Day', 'Time', 'Faculty']];
  const body = data.courses.map(c => [
    c.courseCode,
    c.sectionCode,
    `${c.units.toFixed(1)} ${c.building} ${c.room}`,
    c.day,
    c.time,
    c.faculty
  ]);

  autoTable(doc, {
    startY: y,
    margin: { left: ml, right: mr },
    head: head,
    body: body,
    theme: 'plain',
    styles: {
      font: 'Helvetica',
      fontSize: 9,
      cellPadding: { top: 6, bottom: 6, left: 2, right: 2 },
      textColor: [0, 0, 0],
    },
    headStyles: {
      fontStyle: 'bold',
      fontSize: 9,
    },
    columnStyles: {
      0: { cellWidth: 70 }, 
      1: { cellWidth: 130 },
      2: { cellWidth: 100, halign: 'center' },
      3: { cellWidth: 40, halign: 'center' },
      4: { cellWidth: 110, halign: 'center' },
      5: { cellWidth: 'auto', halign: 'left' },
    },
    didDrawCell: (hookData) => {
      const bottom = hookData.cell.y + hookData.cell.height;
      if (hookData.section === 'head') {
        hr(bottom, ml, pw - mr, 1, 0, 0, 0); 
      } else if (hookData.section === 'body') {
        hr(bottom, ml, pw - mr, 0.3, 180, 180, 180);
      }
    }
  });

  y = doc.lastAutoTable.finalY + 15;

  // ── Total Units ──
  font('bold', 11);
  doc.text(`Total Units: ${data.totalUnits.toFixed(2)}`, pw / 2, y, { align: 'center' });
  y += 18;

  y += 25;

  // ═══════════════════════════════════════════════════════════
  // 5.  CHARGES
  // ═══════════════════════════════════════════════════════════
  font('bold', 10);
  doc.text('Charges', ml, y);
  y += 18;
  font('bold', 9);
  doc.text('Date', ml, y);
  doc.text('Transaction', ml + 80, y);
  y += 4;
  hr(y, ml, ml + 260, 0.5);
  y += 14;

  font('normal', 9.5);
  data.charges.forEach(c => {
    doc.text(c.date || '', ml, y);
    doc.text(c.transaction, ml + 80, y);
    y += 12;
  });

  y += 30;

  // ═══════════════════════════════════════════════════════════
  // 6.  OPTION II – CASH BASIS
  // ═══════════════════════════════════════════════════════════
  font('bold', 10.5);
  doc.text('OPTION II: ', ml, y);
  let curX = ml + doc.getTextWidth('OPTION II: ');
  font('bold', 10.5, 180, 0, 0);
  doc.text('(CASH BASIS)', curX, y);
  curX += doc.getTextWidth('(CASH BASIS)');
  font('bold', 10.5);
  doc.text(' END OF SEMESTER', curX, y);
  
  y += 16;
  font('bold', 8.5);
  doc.text('The above Payment Schedule Options are based on the Current Term Assessment and', ml, y);
  y += 11;
  doc.text('may differ from actual payment schedule if there are previous balance and other', ml, y);
  y += 11;
  doc.text('adjustments.', ml, y);
  
  y += 22;
  const cashBasisY = y;
  font('normal', 10);
  data.cashBasis.forEach(item => {
    doc.text(item.label, ml + 10, y);
    if (item.amount) {
      doc.text(item.amount, ml + 195, y);
    }
    y += 18;
  });

  // Red text note on right
  if (data.cashDiscountNote) {
    font('normal', 7, 180, 0, 0);
    const lines = doc.splitTextToSize(data.cashDiscountNote, 210);
    lines.forEach((line, i) => {
      doc.text(line, pw - mr, cashBasisY + i * 9, { align: 'right' });
    });
  }

  y += 25;

  // ═══════════════════════════════════════════════════════════
  // 7.  OPTION I – INSTALLMENT BASIS
  // ═══════════════════════════════════════════════════════════
  font('bold', 10.5);
  doc.text('OPTION I: (INSTALLMENT BASIS) ', ml, y);
  let ix = ml + doc.getTextWidth('OPTION I: (INSTALLMENT BASIS) ');
  font('bold', 10.5, 180, 0, 0);
  doc.text('ELIGIBLE ', ix, y);
  ix += doc.getTextWidth('ELIGIBLE ');
  font('normal', 10.5);
  doc.text('This', ix, y);
  
  y += 15;
  font('normal', 9.5);
  doc.text('Installment is only for over the Counter ', ml, y);
  let cbX = ml + doc.getTextWidth('Installment is only for over the Counter ');
  font('bold', 9.5, 180, 0, 0);
  doc.text('(CASH BASIS)', cbX, y);
  
  y += 15;
  font('normal', 9.5);
  doc.text('Not longer on the Payment Schedule Current Term', ml, y);
  y += 13;
  doc.text('Assessment:', ml, y);
  
  y += 25;
  data.installmentBasis.forEach(item => {
    if (item.strikethrough) {
      font('bold', 10.5, 180, 0, 0); // Red text
      doc.text(item.label, ml + 15, y);
      const amt = `PHP  ${item.amount}`;
      doc.text(amt, ml + 185, y);
      // Strikethrough
      const w = doc.getTextWidth(amt);
      doc.setDrawColor(180, 0, 0);
      doc.setLineWidth(1.2);
      doc.line(ml + 185, y - 3, ml + 185 + w, y - 3);
      if (item.date) {
        doc.text(item.date, ml + 310, y);
      }
    } else if (item.isTotal) {
      font('bold', 10.5);
      doc.text(item.label, ml + 15, y);
      doc.text(`PHP  ${item.amount}`, ml + 185, y);
    } else {
      font('normal', 10.5);
      doc.text(item.label, ml + 15, y);
      doc.text(`PHP  ${item.amount}`, ml + 185, y);
      if (item.date) {
        font('normal', 10.5, 30, 30, 30);
        doc.text(item.date, ml + 310, y);
      }
    }
    y += 20;
  });

  const safeName = data.studentName.replace(/[^a-zA-Z]/g, '_');
  doc.save(`COR_${safeName}.pdf`);
}

// SAMPLE DATA - matching screenshot content exactly
export const sampleCORData = {
  runDate: '06/7/2026 7:13 PM',
  semesterLabel: 'First Semester, Academic Year SY 2025-2026',
  institute: 'INSTITUTE OF ARTS AND SCIENCES (IAS)',
  transactionNo: '0000959302',
  studentNo: '2022062691',
  studentName: 'COMEDIAM, PATRICK',
  program: 'Bachelor of Science in Psychology',
  postDate: '06/8/2026 12:12 PM',
  courses: [
    { courseCode: 'PSY2201', sectionCode: 'PSY2201-LEC-Sec4-MN', units: 2.0, building: 'SB', room: '208', day: 'M,T', time: '10:30 AM – 12:30 PM', faculty: 'A. SALGADO' },
    { courseCode: 'PSY2201', sectionCode: 'PSY2201-LAB-Sec4-MN', units: 3.0, building: 'SB', room: '304', day: 'TH,F', time: '10:30 AM – 12:30 PM', faculty: 'A. SALGADO' },
    { courseCode: 'PSY0310', sectionCode: 'PSY0310-LEC-Sec7-MN', units: 2.0, building: 'SB', room: '506', day: 'M,T.', time: '1:30 PM – 3:30 PM', faculty: 'J. BUENAFLOR' },
    { courseCode: 'PSY0311', sectionCode: 'PSY0310-LAB-Sec7-MN', units: 3.0, building: 'SB', room: '204', day: 'W,S', time: '10:00 AM – 1:00 PM', faculty: 'J. BUENAFLOR' },
    { courseCode: 'PSY0102', sectionCode: 'PSY2203-LEC-Sec1-MN', units: 2.0, building: 'AB', room: '507', day: 'M,T', time: '4:30 PM – 7:30 PM', faculty: 'G. ATENDIDO' },
    { courseCode: 'PSY0102', sectionCode: 'PSY0102-LAB-Sec1-MN', units: 3.0, building: 'SB', room: '404', day: 'W,S', time: '1:30 PM – 4:30 PM', faculty: 'M. SARMIENTO' },
    { courseCode: 'PSY0350', sectionCode: 'PSY0350-LEC-Sec2 -MN', units: 2.0, building: 'AB', room: '308', day: 'TH,F', time: '1:30 PM – 3:30 PM', faculty: 'W. ONGSITCO' },
    { courseCode: 'PSY0350', sectionCode: 'PSY0350-LEC-Sec9-MN', units: 3.0, building: 'AB', room: '304', day: 'W,S', time: '4:30 PM – 7:30 PM', faculty: 'W. ONGSITCO' },
    { courseCode: 'WRP2022', sectionCode: 'WRP2022-LEC-Sec2-MN', units: 3.0, building: 'AB', room: '106', day: 'W,S', time: '8:00 AM – 9:00 AM', faculty: 'M. MABALACAT' },
  ],
  totalUnits: 23.00,
  charges: [
    { date: '06/05/2026', transaction: 'Initial Assessment' },
    { date: '06/06/2026', transaction: 'Added Courses' },
    { date: '', transaction: 'Changed Courses' },
    { date: '06/08/2026', transaction: 'Changed Section (5)' },
    { date: '06/04/2026', transaction: 'Advanced Courses (3)' },
    { date: '', transaction: 'Dissolved Courses' },
    { date: '', transaction: 'Cancelled Registration' },
  ],
  cashBasis: [
    { label: 'Current Term Assessment', amount: 'Php47,798.47' },
    { label: 'Less 30% Sibling Cash Discount', amount: '' },
    { label: 'Net Amount Due', amount: 'Php47,798.47' },
  ],
  cashDiscountNote: 'This 30% cash discount can be availed of, if any previous balance has been fully paid, and if the Net Amount Due is paid on or before the cash discount deadline*. (* refer to enrollment activities schedule via canvas)',
  installmentBasis: [
    { label: 'Down Payment', amount: '12,000.000', date: '06/05/2026 – 2:48 PM', strikethrough: true },
    { label: 'First Installment', amount: '27,000.00', date: '07/01/2026' },
    { label: 'Second Installment', amount: '20,798.47', date: '07/16/2026' },
    { label: 'Total Amount Due', amount: '47,798.47', isTotal: true },
  ],
};