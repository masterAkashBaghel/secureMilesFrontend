import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  constructor(private http: HttpClient) {}

  generatePolicyPDF(policy: any): void {
    const logoPath = '/public/assets/images/logo3.png'; // Path to the logo in assets folder

    // Fetch the logo and generate the PDF
    this.getBase64ImageFromAssets(logoPath).then((logoBase64) => {
      const doc = new jsPDF();

      // Add the logo to the PDF
      const imgWidth = 40;
      const imgHeight = 15;
      doc.addImage(logoBase64, 'PNG', 14, 10, imgWidth, imgHeight);

      // Add header
      doc.setFontSize(22);
      doc.setTextColor('#2E86C1');
      doc.text('SecureMiles Insurance', 14, 30);

      // Add subheading
      doc.setFontSize(16);
      doc.setTextColor('#000');
      doc.text('Official Policy Document', 14, 40);

      // Add policy details in tabular form
      autoTable(doc, {
        startY: 50,
        styles: {
          fontSize: 10,
          textColor: '#333',
          lineColor: '#ddd',
          lineWidth: 0.2,
        },
        headStyles: {
          fillColor: '#2E86C1',
          textColor: '#fff',
          fontSize: 12,
        },
        bodyStyles: { textColor: '#000' },
        head: [['Field', 'Value']],
        body: [
          ['Policy ID', policy.policyId || 'N/A'],
          ['Policy Type', policy.policyType || 'N/A'],

          ['Premium Amount', `Rs${policy.premiumAmount || 'N/A'}`],
          ['Policy Start Date', policy.policyStartDate || 'N/A'],
          ['Policy End Date', policy.policyEndDate || 'N/A'],
          ['Status', policy.status || 'N/A'],
          ['User Name', policy.user?.name || 'N/A'],
          ['User Email', policy.user?.email || 'N/A'],
          ['User Phone', policy.user?.phone || 'N/A'],
          ['Vehicle Make', policy.vehicle?.make || 'N/A'],
          ['Vehicle Model', policy.vehicle?.model || 'N/A'],
          [
            'Vehicle Registration Number',
            policy.vehicle?.registrationNumber || 'N/A',
          ],
          ['Vehicle Type', policy.vehicle?.vehicleType || 'N/A'],
          ['Payment ID', policy.payment?.paymentId || 'N/A'],
          ['Payment Amount', `Rs${policy.payment?.amount || 'N/A'}`],
          ['Payment Date', policy.payment?.paymentDate || 'N/A'],
          ['Transaction ID', policy.payment?.transactionId || 'N/A'],
        ],
      });

      // Add footer and terms
      let finalY = (doc as any).lastAutoTable.finalY || 50;

      // Define footer content
      const footerContent = [
        'SecureMiles Insurance · Contact: support@securemiles.com · Phone: +91 9559661323',
        `Generated on: ${new Date().toLocaleString()}`,
      ];
      const footerHeight = 20; // Approximate height for the footer

      // Calculate available space for terms and conditions
      const pageHeight = doc.internal.pageSize.height || 297; // A4 size page height
      const remainingSpace = pageHeight - finalY - footerHeight;

      // Add terms and conditions
      const terms = [
        '1. The policyholder must pay the premium on or before the due date.',
        '2. The insurance coverage is subject to the terms and conditions outlined in the policy document.',
        '3. Claims must be reported within 30 days of the incident.',
        '4. The insurer reserves the right to reject any claim if the policyholder fails to comply with the policy terms.',
        '5. The policyholder must provide accurate and complete information when applying for the policy.',
        '6. Any false or misleading information may result in the cancellation of the policy.',
        '7. The policyholder can renew the policy before the expiry date to continue the coverage.',
      ];
      const termsLineHeight = 10; // Height per term line
      const termsHeight = terms.length * termsLineHeight;

      // Check if terms fit on the current page, otherwise add a new page
      if (remainingSpace < termsHeight) {
        doc.addPage();
        finalY = 10; // Reset finalY for the new page
      }

      doc.setFontSize(14);
      doc.text('Terms and Conditions', 14, finalY + 10);
      doc.setFontSize(10);
      doc.setTextColor('#555');
      terms.forEach((term, index) => {
        doc.text(term, 14, finalY + 20 + index * termsLineHeight);
      });

      // Add footer content
      const footerStartY = pageHeight - footerHeight + 5;
      doc.setFontSize(10);
      doc.setTextColor('#999');
      footerContent.forEach((line, index) => {
        doc.text(line, 14, footerStartY + index * 5);
      });

      // Save the PDF
      doc.save(`Policy_${policy.policyId}.pdf`);
    });
  }

  // Convert image from assets to Base64
  private getBase64ImageFromAssets(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(path, { responseType: 'blob' }).subscribe({
        next: (blob) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(blob);
        },
        error: (error) => reject(error),
      });
    });
  }
}
