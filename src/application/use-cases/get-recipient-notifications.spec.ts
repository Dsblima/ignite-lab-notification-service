import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notification";
import { CountRecipientNotification } from "./count-recipient-notifications";
import { NotificationNotFound } from "./errors/notification-not-found";
import { GetRecipientNotification } from "./get-recipient-notifications";

describe('Count recipient Notification', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotification = new GetRecipientNotification(notificationsRepository);

    await notificationsRepository.create(makeNotification({recipientId: 'recipient-1'}));
    await notificationsRepository.create(makeNotification({recipientId: 'recipient-2'}));
    await notificationsRepository.create(makeNotification({recipientId: 'recipient-1'}));

    const { notifications } = await getRecipientNotification.execute({
      recipientId: "recipient-1",
    });
    
    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' })
      ]),
    );
  });
});