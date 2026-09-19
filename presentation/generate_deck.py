from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.util import Inches, Pt


W, H = 13.333, 7.5
BG = RGBColor(18, 11, 16)
INK = RGBColor(36, 28, 23)
MUTED = RGBColor(120, 107, 98)
MAUVE = RGBColor(135, 93, 120)
PALE = RGBColor(244, 232, 238)
GOLD = RGBColor(245, 196, 107)
IVORY = RGBColor(252, 251, 249)
GREEN = RGBColor(45, 138, 67)


prs = Presentation()
prs.slide_width = Inches(W)
prs.slide_height = Inches(H)


def box(slide, x, y, w, h, color, radius=False, transparency=0):
    shape_type = MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE
    shape = slide.shapes.add_shape(shape_type, Inches(x), Inches(y), Inches(w), Inches(h))
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.fill.transparency = transparency
    shape.line.fill.background()
    return shape


def text(slide, value, x, y, w, h, size=18, color=INK, bold=False, font="Aptos", align=PP_ALIGN.LEFT):
    shape = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    frame = shape.text_frame
    frame.clear()
    frame.word_wrap = True
    frame.margin_left = Inches(0.02)
    frame.margin_right = Inches(0.02)
    frame.vertical_anchor = MSO_ANCHOR.MIDDLE
    paragraph = frame.paragraphs[0]
    paragraph.alignment = align
    run = paragraph.add_run()
    run.text = value
    run.font.name = font
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    return shape


def bullet_list(slide, items, x, y, w, h, size=18, color=INK):
    shape = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    frame = shape.text_frame
    frame.clear()
    frame.word_wrap = True
    frame.margin_left = Inches(0.04)
    frame.margin_right = Inches(0.04)
    for index, item in enumerate(items):
        paragraph = frame.paragraphs[0] if index == 0 else frame.add_paragraph()
        paragraph.text = item
        paragraph.level = 0
        paragraph.space_after = Pt(10)
        paragraph.font.name = "Aptos"
        paragraph.font.size = Pt(size)
        paragraph.font.color.rgb = color
        paragraph.bullet = True
    return shape


def base_slide(title, kicker, dark=False):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    background = BG if dark else IVORY
    box(slide, 0, 0, W, H, background)
    text(slide, kicker.upper(), 0.72, 0.48, 4.5, 0.3, 10, GOLD if dark else MAUVE, True)
    text(slide, title, 0.72, 0.84, 11.8, 0.72, 28, PALE if dark else INK, True, "Aptos Display")
    box(slide, 0.72, 1.72, 1.1, 0.04, GOLD if dark else MAUVE)
    return slide


def footer(slide, number, dark=False):
    text(slide, "LEI  /  Hackathon pitch", 0.72, 7.08, 4, 0.2, 9, PALE if dark else MUTED)
    text(slide, str(number).zfill(2), 12.1, 7.08, 0.5, 0.2, 9, GOLD if dark else MAUVE, True, align=PP_ALIGN.RIGHT)


# 1. Cover
slide = prs.slides.add_slide(prs.slide_layouts[6])
box(slide, 0, 0, W, H, BG)
box(slide, 8.7, -0.8, 5.5, 9, MAUVE, True, 38)
box(slide, 10.0, 1.0, 3.5, 5.7, GOLD, True, 72)
text(slide, "LEI", 0.85, 1.0, 4.5, 0.8, 18, GOLD, True)
text(slide, "From isolation\nto momentum.", 0.85, 2.0, 8.6, 1.8, 38, PALE, True, "Aptos Display")
text(slide, "A protected ecosystem where women learn, grow careers,\nand build meaningful connections.", 0.9, 4.25, 7.3, 0.9, 20, PALE)
text(slide, "Education  |  Career growth  |  Belonging", 0.9, 5.7, 7.3, 0.4, 13, GOLD, True)
text(slide, "Hackathon demo", 0.9, 6.55, 3, 0.25, 10, PALE)
footer(slide, 1, True)

# 2. Problem
slide = base_slide("The opportunity is not another social feed", "01  /  The problem")
text(slide, "Women often have to stitch together support from disconnected places:", 0.8, 2.15, 11.7, 0.45, 21, INK)
cards = [
    ("Learn", "Campus resources and practical knowledge are hard to find at the moment they matter.", MAUVE),
    ("Grow", "Career advice is scattered across cold networking, generic content, and one-off events.", GOLD),
    ("Belong", "Connection is valuable only when people feel safe enough to ask, share, and return.", GREEN),
]
for i, (heading, body, accent) in enumerate(cards):
    x = 0.8 + i * 4.15
    box(slide, x, 3.0, 3.65, 2.45, RGBColor(255, 255, 255), True)
    box(slide, x, 3.0, 0.1, 2.45, accent)
    text(slide, heading, x + 0.3, 3.35, 2.9, 0.38, 22, INK, True)
    text(slide, body, x + 0.3, 3.9, 2.95, 1.1, 15, MUTED)
text(slide, "The gap: support exists, but it is not connected to the woman's next step.", 0.8, 6.0, 11.8, 0.45, 21, MAUVE, True)
footer(slide, 2)

# 3. Solution
slide = base_slide("Lèi turns support into a guided journey", "02  /  The solution", True)
text(slide, "One trusted front door. Three pathways to momentum.", 0.8, 2.15, 11.7, 0.45, 21, PALE)
pillars = [
    ("01", "Learn", "Campus SOS, student aid, grounding resources, and peer knowledge."),
    ("02", "Grow", "Career conversations, AI coaching, milestones, and opportunity sharing."),
    ("03", "Connect", "Wellbeing signals, circles, meetups, DMs, and mutual aid."),
]
for i, (num, heading, body) in enumerate(pillars):
    x = 0.85 + i * 4.12
    box(slide, x, 3.0, 3.55, 2.5, RGBColor(42, 28, 38), True)
    text(slide, num, x + 0.28, 3.28, 0.65, 0.4, 15, GOLD, True)
    text(slide, heading, x + 0.28, 3.78, 2.8, 0.45, 25, PALE, True, "Aptos Display")
    text(slide, body, x + 0.28, 4.45, 2.8, 0.75, 15, PALE)
text(slide, "The product is not the number of modules. It is the moment a member finds her next useful action.", 0.85, 6.1, 11.7, 0.45, 18, GOLD, True)
footer(slide, 3, True)

# 4. Demo journey
slide = base_slide("Our demo: one member, one connected journey", "03  /  The product")
text(slide, "Tell this story live instead of clicking every feature.", 0.8, 2.1, 11.5, 0.4, 20, MUTED)
steps = [
    ("01", "Arrive", "A welcoming gate asks what she needs today."),
    ("02", "Name the need", "She selects ambitious, overwhelmed, or healing."),
    ("03", "Find support", "She sees campus help, career guidance, and safe circles."),
    ("04", "Take action", "She posts, joins, asks, learns, or connects."),
]
for i, (num, heading, body) in enumerate(steps):
    x = 0.82 + i * 3.1
    text(slide, num, x, 3.1, 0.6, 0.4, 15, MAUVE, True)
    box(slide, x + 0.72, 3.3, 1.75, 0.04, GOLD)
    text(slide, heading, x, 3.75, 2.45, 0.42, 21, INK, True)
    text(slide, body, x, 4.35, 2.45, 1.05, 15, MUTED)
text(slide, "Judge takeaway: Lèi reduces the distance between vulnerability and opportunity.", 0.82, 6.18, 11.7, 0.42, 20, MAUVE, True)
footer(slide, 4)

# 5. Track alignment
slide = base_slide("Built for the track, not adjacent to it", "04  /  Track alignment", True)
alignment = [
    ("Education", "Campus SOS + student networks", "A student can find immediate help, resources, and peers without leaving her trusted space."),
    ("Career growth", "AI concierge + career feed", "A member can turn a question into coaching, a conversation, or a concrete next step."),
    ("Meaningful connections", "Circles + wellbeing + meetups", "The platform makes connection contextual: who I am, what I need, and where I am today."),
]
for i, (heading, label, body) in enumerate(alignment):
    y = 2.15 + i * 1.45
    text(slide, heading, 0.85, y, 2.15, 0.32, 17, GOLD, True)
    text(slide, label, 3.1, y, 3.2, 0.32, 18, PALE, True)
    text(slide, body, 6.5, y - 0.02, 5.7, 0.55, 15, PALE)
    box(slide, 0.85, y + 0.75, 11.35, 0.02, RGBColor(82, 57, 75))
text(slide, "A single experience connects all three outcomes.", 0.85, 6.55, 11.5, 0.35, 19, GOLD, True)
footer(slide, 5, True)

# 6. Trust
slide = base_slide("Trust is the product feature", "05  /  Why this can work")
trust = [
    ("Protected entry", "A gated experience and community covenant make the first interaction feel intentional."),
    ("Contextual spaces", "Members choose the space that feels right while keeping a shared welcome realm."),
    ("Trauma-informed design", "Wellbeing is a signal for support, not a label that changes her access or worth."),
    ("Safety by default", "SOS, reporting, age gates, and privacy controls turn belonging into infrastructure."),
]
for i, (heading, body) in enumerate(trust):
    x = 0.85 + (i % 2) * 6.0
    y = 2.25 + (i // 2) * 1.95
    box(slide, x, y, 5.25, 1.35, RGBColor(255, 255, 255), True)
    text(slide, heading, x + 0.25, y + 0.22, 4.6, 0.32, 18, INK, True)
    text(slide, body, x + 0.25, y + 0.64, 4.6, 0.5, 14, MUTED)
text(slide, "We are designing for the moment someone decides whether it is safe to stay.", 0.85, 6.45, 11.5, 0.4, 19, MAUVE, True)
footer(slide, 6)

# 7. Impact
slide = base_slide("We will measure movement, not vanity metrics", "06  /  Impact")
text(slide, "A pilot with campuses and women-led communities can measure whether Lèi creates real momentum:", 0.8, 2.05, 11.8, 0.55, 19, INK)
metrics = [
    ("Access", "time to first useful resource"),
    ("Growth", "career actions started per member"),
    ("Connection", "meaningful replies and repeat participation"),
    ("Safety", "resolved SOS and support requests"),
]
for i, (label, body) in enumerate(metrics):
    x = 0.82 + i * 3.1
    box(slide, x, 3.1, 2.7, 2.0, RGBColor(255, 255, 255), True)
    text(slide, label, x + 0.25, 3.45, 2.2, 0.35, 18, MAUVE, True)
    text(slide, body, x + 0.25, 4.05, 2.15, 0.65, 16, INK)
text(slide, "North star: more women leave each interaction with a person, resource, or action that moves them forward.", 0.82, 6.0, 11.7, 0.55, 20, GREEN, True)
footer(slide, 7)

# 8. Roadmap
slide = base_slide("The prototype proves the direction", "07  /  What comes next", True)
roadmap = [
    ("Now", "Interactive sanctuary prototype", "Validate the journey and emotional language with real members."),
    ("Next", "Campus and career pilots", "Partner with one campus and one women-led career community."),
    ("Then", "Trusted opportunity graph", "Connect needs to mentors, resources, events, and measurable outcomes."),
]
for i, (phase, heading, body) in enumerate(roadmap):
    x = 0.85 + i * 4.1
    text(slide, phase.upper(), x, 2.35, 2.7, 0.3, 11, GOLD, True)
    text(slide, heading, x, 2.85, 3.1, 0.75, 23, PALE, True, "Aptos Display")
    text(slide, body, x, 4.05, 3.15, 1.1, 15, PALE)
text(slide, "We are not asking women to find their way through another platform. We are building a place that helps them move.", 0.85, 6.15, 11.6, 0.55, 19, GOLD, True)
footer(slide, 8, True)

# 9. Close
slide = prs.slides.add_slide(prs.slide_layouts[6])
box(slide, 0, 0, W, H, BG)
text(slide, "LEI", 0.85, 1.25, 3, 0.5, 17, GOLD, True)
text(slide, "Everything for HER.\nConnect. Discover. Grow.", 0.85, 2.25, 9.2, 1.6, 36, PALE, True, "Aptos Display")
text(slide, "A protected ecosystem for the next step.", 0.9, 4.65, 7.5, 0.45, 21, GOLD)
text(slide, "Live demo: pkyeibrewu1.github.io/LEI/?developer=1", 0.9, 6.2, 7.8, 0.3, 12, PALE)
footer(slide, 9, True)

prs.save("presentation/lei-hackathon-pitch.pptx")