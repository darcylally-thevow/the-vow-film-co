const dropdown = document.querySelector("#package");
const inquirySection = document.querySelector("#contact");

document.querySelectorAll("[data-package]").forEach((packageSection) => {
    packageSection.addEventListener("click", () => {
        if (!dropdown || !inquirySection) return;

        dropdown.value = packageSection.dataset.package;

        inquirySection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

/* INQUIRY FORM: Submit without leaving the website */
const inquiryForm = document.querySelector("#inquiry-form");
const inquirySuccess = document.querySelector("#inquiry-success");
const inquiryReset = document.querySelector("#inquiry-reset");

if (inquiryForm && inquirySuccess && inquiryReset) {
    inquiryForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!inquiryForm.reportValidity()) return;

        const submitButton = inquiryForm.querySelector(
            'button[type="submit"]'
        );
        const originalButtonText = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.textContent = "SENDING...";

        try {
            const response = await fetch(inquiryForm.action, {
                method: "POST",
                body: new FormData(inquiryForm),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("The inquiry could not be submitted.");
            }

            inquiryForm.hidden = true;
            inquirySuccess.hidden = false;

            document.querySelector("#contact").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        } catch (error) {
            alert(
                "We couldn't submit your inquiry. Please check your connection and try again."
            );
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });

    inquiryReset.addEventListener("click", () => {
        inquiryForm.reset();
        inquiryForm.hidden = false;
        inquirySuccess.hidden = true;

        inquiryForm.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}

/* =========================
   AUTOMATIC SCROLL ANIMATIONS
========================= */

document.body.classList.add("js-scroll-reveal");

const revealElements = document.querySelectorAll(`
    .section h2,
    .section h3,
    .section .eyebrow,
    .section p,
    .section img,
    .section video,
    .section iframe,
    .section figure,
    .film-card,
    .package-card,
    .testimonial,
    .why-us-item,
    .inquiry-form > *,
    .contact-heading > *
`);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -25px 0px"
        }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("is-visible");
    });
}