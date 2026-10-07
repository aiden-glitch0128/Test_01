package com.choicelog.app;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

public class ReminderReceiver extends BroadcastReceiver {
    private static final String CHANNEL_ID = "daily_choice_log";

    @Override
    public void onReceive(Context context, Intent intent) {
        NotificationManager manager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager == null) return;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID, "매일 아침 선택권 로그", NotificationManager.IMPORTANCE_DEFAULT);
            channel.setDescription("매일 아침 오늘의 선택권을 기록하도록 알려줍니다.");
            manager.createNotificationChannel(channel);
        }

        Intent openIntent = new Intent(context, MainActivity.class);
        openIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(
                context, 1002, openIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

        android.app.Notification.Builder builder = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                ? new android.app.Notification.Builder(context, CHANNEL_ID)
                : new android.app.Notification.Builder(context);

        builder.setSmallIcon(android.R.drawable.ic_dialog_info)
                .setContentTitle("오늘도 내 선택권을 하나 넓혀볼까?")
                .setContentText("몸 · 돈 · 내 일 중 오늘 무엇을 넓힐지 한 줄로 남겨보세요.")
                .setStyle(new android.app.Notification.BigTextStyle().bigText(
                        "나는 이 세상에 여행하러 왔다. 오늘도 몸 · 돈 · 내 일 중 하나의 선택권을 넓혀보자."))
                .setAutoCancel(true)
                .setContentIntent(pendingIntent);

        manager.notify(20261007, builder.build());
    }
}
