
import os
import httpx


async def send_whatsapp_message(
    phone: str,
    message: str,
) -> None:
    phone_id = os.environ["WHATSAPP_PHONE_NUMBER_ID"]
    token = os.environ["WHATSAPP_ACCESS_TOKEN"]
    version = os.environ["WHATSAPP_API_VERSION"]

    url = (
        f"https://graph.facebook.com/{version}"
        f"/{phone_id}/messages"
    )

    payload = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": phone,
        "type": "text",
        "text": {
            "preview_url": False,
            "body": message,
        },
    }

    async with httpx.AsyncClient(timeout=15) as client:
        response = await client.post(
            url,
            json=payload,
            headers={
                "Authorization": f"Bearer {token}",
            },
        )
        response.raise_for_status()
