// Browsers draw their own print header/footer (date, title, URL) inside the page margin, so the PDF
// export uses a zero page margin. This layout table puts the margins back: browsers repeat a table's
// header and footer groups on every printed page. On screen it renders as plain blocks.
const PrintFrame = ({ children }: { children: React.ReactNode }) => (
  <table role="presentation" className="print-frame">
    <thead>
      <tr>
        <td />
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{children}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td />
      </tr>
    </tfoot>
  </table>
);

export default PrintFrame;
