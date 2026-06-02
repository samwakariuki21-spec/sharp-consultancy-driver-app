from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "school-driver-requirements.pdf"


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="SharpTitle",
    parent=styles["Title"],
    textColor=colors.HexColor("#135d66"),
    fontName="Helvetica-Bold",
    fontSize=20,
    leading=24,
    spaceAfter=8,
))
styles.add(ParagraphStyle(
    name="Section",
    parent=styles["Heading2"],
    textColor=colors.HexColor("#0a444c"),
    fontName="Helvetica-Bold",
    fontSize=13,
    leading=16,
    spaceBefore=12,
    spaceAfter=6,
))
styles.add(ParagraphStyle(
    name="BodyTextSharp",
    parent=styles["BodyText"],
    fontName="Helvetica",
    fontSize=9.5,
    leading=13,
    spaceAfter=5,
))
styles.add(ParagraphStyle(
    name="Small",
    parent=styles["BodyText"],
    fontName="Helvetica",
    fontSize=8.2,
    leading=11,
    textColor=colors.HexColor("#4d5d61"),
))


def p(text, style="BodyTextSharp"):
    return Paragraph(text, styles[style])


story = [
    p("Sharp Consultancy Limited", "SharpTitle"),
    p("<b>School Driver Document Requirements Checklist</b>"),
    p("Contact: 0711608769 &nbsp; | &nbsp; Email: samwakariuki21@gmail.com"),
    Spacer(1, 5 * mm),
    p("Purpose", "Section"),
    p("This checklist helps drivers prepare the documents commonly requested by schools, employers, and school transport operators before hiring. Employers should still confirm current legal requirements directly with NTSA, the Ministry of Education, and relevant authorities."),
    p("Driver Documents To Prepare", "Section"),
]

requirements = [
    ["1", "National ID or passport", "For identity verification."],
    ["2", "Valid Kenyan driving licence", "Must match the class of vehicle being driven."],
    ["3", "PSV licence / PSV endorsement or badge", "Important where the role involves public or school transport."],
    ["4", "Certificate of Good Conduct / Police Clearance", "Issued through DCI or the relevant official process."],
    ["5", "Medical fitness certificate", "Commonly requested for school transport roles involving children."],
    ["6", "Proof of driving experience", "Many school transport roles expect at least 3 years of professional driving experience."],
    ["7", "Driver CV/profile and passport photo", "Helps employers screen work history quickly."],
    ["8", "Referee contacts", "Previous employers, schools, or transport operators."],
    ["9", "Training certificates", "First aid, defensive driving, child safety, or related training where available."],
    ["10", "Vehicle/operator records where applicable", "Employers/operators should separately confirm inspection, insurance, seat belts, speed compliance, and maintenance records."],
]

table = Table(
    [[p("<b>No.</b>"), p("<b>Requirement</b>"), p("<b>Why it matters</b>")]] + [
        [p(no), p(req), p(note)] for no, req, note in requirements
    ],
    colWidths=[14 * mm, 58 * mm, 102 * mm],
)
table.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#eef6f4")),
    ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#c9d9d8")),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 6),
    ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ("TOPPADDING", (0, 0), (-1, -1), 6),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
]))
story.extend([table, Spacer(1, 4 * mm)])

story.extend([
    p("School Transport Notes", "Section"),
    p("Ministry of Education guidance for pre-primary transport mentions a driver above 25 years, at least 3 years driving experience, a valid driving licence, a valid medical certificate, a certificate of good conduct, uniform, and identification badge."),
    p("NTSA official materials and service portal cover driver licensing, PSV operations, driver testing, vehicle registration, inspection, and public transport operations."),
    p("NTSA school transport regulatory notes emphasize qualified drivers, licensing, vehicle standards, insurance, maintenance records, passenger manifest, road safety obligations, and school transport operating protocols."),
    p("Quick Search Payment", "Section"),
    p("Drivers may select Quick Search priority matching at <b>KSH 400</b> when submitting a job request. This helps the request appear faster in the employer queue."),
    p("Sources Checked On 25 May 2026", "Section"),
    p("1. NTSA official website: https://ntsa.go.ke/", "Small"),
    p("2. NTSA service portal: https://serviceportal.ntsa.go.ke/", "Small"),
    p("3. Ministry of Education National Pre-primary Education Policy Standard Guidelines: https://www.education.go.ke/sites/default/files/2022-05/PRE-PRIMARY-POLICY-Guidelines-1.pdf", "Small"),
    p("4. NTSA school transport regulatory notes: https://ntsa.go.ke/shared-download/2fff505e728baf4a1b4597f551e9c40a538bf77c8bfc2cd142e06eda8a0f6e5f", "Small"),
])

doc = SimpleDocTemplate(
    str(OUT),
    pagesize=A4,
    rightMargin=18 * mm,
    leftMargin=18 * mm,
    topMargin=16 * mm,
    bottomMargin=16 * mm,
    title="Sharp Consultancy Limited School Driver Requirements",
)
doc.build(story)
print(OUT)
