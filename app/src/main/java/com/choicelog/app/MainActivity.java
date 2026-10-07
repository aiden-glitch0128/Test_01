package com.choicelog.app;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.TimePickerDialog;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;
import org.json.JSONArray;
import org.json.JSONObject;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class MainActivity extends Activity {
    private static final String PREFS = "choice_log_prefs";
    private static final String KEY_RECORDS = "records";
    private static final String KEY_HOUR = "reminder_hour";
    private static final String KEY_MINUTE = "reminder_minute";

    private LinearLayout content;
    private final int green = Color.rgb(46, 94, 78);
    private final int ink = Color.rgb(31, 37, 34);
    private final int muted = Color.rgb(108, 117, 112);
    private final int paper = Color.rgb(250, 250, 247);

    private final String manifesto =
            "나는 이 세상에 여행하러 왔다.\n\n" +
            "한 번뿐인 삶에서 많이 보고, 해보고, 느끼며 살고 싶다.\n" +
            "내가 원하는 것은 비싼 물건이 아니라 선택할 수 있는 삶이다.\n\n" +
            "그래서 나는 몸을 만든다. 더 많은 것을 경험할 건강과 자신감을 위해.\n\n" +
            "나는 경제적인 그릇을 키운다. 나와 가족의 선택지를 넓히기 위해.\n\n" +
            "나는 내 일을 만든다. 내 시간과 삶의 방향을 조금씩 내가 결정하기 위해.\n\n" +
            "미래를 위해 오늘을 전부 희생하지도 않고, 오늘을 즐긴다는 이유로 미래의 자유를 팔아버리지도 않는다.\n\n" +
            "오늘도 내 선택권을 하나씩 넓힌다.\n" +
            "지금 이 삶을 오래, 다채롭게 살아가기 위해 나는 더 강한 사람이 되어간다.";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestNotificationPermission();
        ReminderScheduler.schedule(this);
        showToday();
    }

    private void requestNotificationPermission() {
        if (Build.VERSION.SDK_INT >= 33 &&
                checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 77);
        }
    }

    private void scaffold(String title) {
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setBackgroundColor(paper);
        root.setPadding(dp(18), dp(16), dp(18), dp(12));

        TextView header = text(title, 25, ink, true);
        header.setPadding(0, 0, 0, dp(14));
        root.addView(header);

        ScrollView scroll = new ScrollView(this);
        content = new LinearLayout(this);
        content.setOrientation(LinearLayout.VERTICAL);
        scroll.addView(content);
        root.addView(scroll, new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, 0, 1));

        LinearLayout nav = new LinearLayout(this);
        nav.setOrientation(LinearLayout.HORIZONTAL);
        nav.setGravity(Gravity.CENTER);
        nav.setPadding(0, dp(8), 0, 0);
        nav.addView(navButton("오늘", v -> showToday()), weight());
        nav.addView(navButton("기록", v -> showHistory()), weight());
        nav.addView(navButton("주간", v -> showWeekly()), weight());
        nav.addView(navButton("설정", v -> showSettings()), weight());
        root.addView(nav);
        setContentView(root);
    }

    private void showToday() {
        scaffold("선택권 로그");
        TextView date = text(new SimpleDateFormat("yyyy년 M월 d일 EEEE", Locale.KOREAN).format(new Date()), 15, muted, false);
        date.setPadding(0, 0, 0, dp(14));
        content.addView(date);

        TextView card = text(manifesto, 16, ink, false);
        card.setBackgroundColor(Color.WHITE);
        card.setPadding(dp(16), dp(16), dp(16), dp(16));
        content.addView(card, fullWrap(dp(10)));

        TextView q = text("오늘 나는 몸 · 돈 · 내 일 중 어떤 선택권을 넓힐 것인가?", 20, ink, true);
        q.setPadding(0, dp(16), 0, dp(10));
        content.addView(q);

        RadioGroup group = new RadioGroup(this);
        group.setOrientation(LinearLayout.HORIZONTAL);
        String[] categories = {"몸", "돈", "내 일"};
        for (String c : categories) {
            RadioButton rb = new RadioButton(this);
            rb.setText(c);
            rb.setTextSize(17);
            rb.setTextColor(ink);
            group.addView(rb, weight());
        }
        ((RadioButton) group.getChildAt(0)).setChecked(true);
        content.addView(group);

        EditText input = new EditText(this);
        input.setHint("오늘 딱 하나 할 행동을 적어보세요.\n예: 저녁 30분 걷기");
        input.setTextSize(17);
        input.setMinLines(3);
        input.setGravity(Gravity.TOP);
        input.setPadding(dp(12), dp(12), dp(12), dp(12));
        content.addView(input, fullWrap(dp(12)));

        Button save = primaryButton("오늘의 선택 저장", v -> {
            RadioButton selected = group.findViewById(group.getCheckedRadioButtonId());
            String category = selected == null ? "몸" : selected.getText().toString();
            String action = input.getText().toString().trim();
            if (TextUtils.isEmpty(action)) {
                Toast.makeText(this, "오늘 할 행동을 한 줄 적어주세요.", Toast.LENGTH_SHORT).show();
                return;
            }
            saveRecord(category, action);
            input.setText("");
            Toast.makeText(this, "저장했어요. 오늘도 선택권 +1", Toast.LENGTH_SHORT).show();
        });
        content.addView(save, fullWrap(dp(18)));
    }

    private void showHistory() {
        scaffold("나의 기록");
        JSONArray arr = records();
        if (arr.length() == 0) {
            TextView empty = text("아직 기록이 없어요.\n오늘의 선택 하나부터 시작해보세요.", 17, muted, false);
            empty.setGravity(Gravity.CENTER);
            empty.setPadding(0, dp(80), 0, 0);
            content.addView(empty);
            return;
        }
        for (int i = arr.length() - 1; i >= 0; i--) {
            JSONObject o = arr.optJSONObject(i);
            if (o == null) continue;
            String line = o.optString("date") + "  ·  " + o.optString("category") + "\n" + o.optString("action");
            TextView item = text(line, 16, ink, false);
            item.setBackgroundColor(Color.WHITE);
            item.setPadding(dp(14), dp(14), dp(14), dp(14));
            content.addView(item, fullWrap(dp(8)));
        }
    }

    private void showWeekly() {
        scaffold("이번 주 선택권");
        long now = System.currentTimeMillis();
        long sevenDays = 7L * 24 * 60 * 60 * 1000;
        int body = 0, money = 0, work = 0, total = 0;
        JSONArray arr = records();
        StringBuilder recent = new StringBuilder();

        for (int i = arr.length() - 1; i >= 0; i--) {
            JSONObject o = arr.optJSONObject(i);
            if (o == null) continue;
            if (now - o.optLong("timestamp", 0) <= sevenDays) {
                total++;
                String c = o.optString("category");
                if ("몸".equals(c)) body++;
                else if ("돈".equals(c)) money++;
                else if ("내 일".equals(c)) work++;
                recent.append("• ").append(c).append("  ").append(o.optString("action")).append("\n");
            }
        }

        content.addView(text("이번 주 기록 " + total + "개", 24, ink, true), fullWrap(dp(12)));
        content.addView(metric("몸", body));
        content.addView(metric("돈", money));
        content.addView(metric("내 일", work));

        TextView prompt = text("이번 주 나는 어떤 선택권을 가장 많이 넓혔을까?", 18, ink, true);
        prompt.setPadding(0, dp(20), 0, dp(8));
        content.addView(prompt);

        TextView list = text(recent.length() == 0 ? "이번 주 기록이 아직 없어요." : recent.toString().trim(), 16, muted, false);
        list.setBackgroundColor(Color.WHITE);
        list.setPadding(dp(14), dp(14), dp(14), dp(14));
        content.addView(list, fullWrap(dp(10)));
    }

    private View metric(String label, int count) {
        TextView t = text(label + "   " + count + "회", 18, ink, true);
        t.setBackgroundColor(Color.WHITE);
        t.setPadding(dp(16), dp(14), dp(16), dp(14));
        t.setGravity(Gravity.CENTER_VERTICAL);
        t.setLayoutParams(fullWrap(dp(8)));
        return t;
    }

    private void showSettings() {
        scaffold("설정");
        int hour = getSharedPreferences(PREFS, MODE_PRIVATE).getInt(KEY_HOUR, 7);
        int minute = getSharedPreferences(PREFS, MODE_PRIVATE).getInt(KEY_MINUTE, 0);

        TextView info = text("매일 아침 이 시간쯤 알림이 옵니다. Android의 배터리 정책 때문에 몇 분 정도 늦을 수 있어요.", 16, muted, false);
        info.setPadding(0, 0, 0, dp(14));
        content.addView(info);

        Button time = primaryButton(String.format(Locale.KOREAN, "알림 시간  %02d:%02d", hour, minute), v -> {
            int h0 = getSharedPreferences(PREFS, MODE_PRIVATE).getInt(KEY_HOUR, 7);
            int m0 = getSharedPreferences(PREFS, MODE_PRIVATE).getInt(KEY_MINUTE, 0);
            new TimePickerDialog(this, (view, h, m) -> {
                ReminderScheduler.schedule(this, h, m);
                Toast.makeText(this, "알림 시간을 저장했어요.", Toast.LENGTH_SHORT).show();
                showSettings();
            }, h0, m0, true).show();
        });
        content.addView(time, fullWrap(dp(12)));

        Button test = outlineButton("지금 알림 테스트", v -> {
            new ReminderReceiver().onReceive(this, null);
            Toast.makeText(this, "테스트 알림을 보냈어요.", Toast.LENGTH_SHORT).show();
        });
        content.addView(test, fullWrap(dp(10)));

        Button clear = outlineButton("모든 기록 삭제", v -> new AlertDialog.Builder(this)
                .setTitle("모든 기록을 삭제할까요?")
                .setMessage("이 작업은 되돌릴 수 없습니다.")
                .setNegativeButton("취소", null)
                .setPositiveButton("삭제", (d, w) -> {
                    getSharedPreferences(PREFS, MODE_PRIVATE).edit().remove(KEY_RECORDS).apply();
                    Toast.makeText(this, "기록을 삭제했어요.", Toast.LENGTH_SHORT).show();
                }).show());
        content.addView(clear, fullWrap(dp(10)));
    }

    private void saveRecord(String category, String action) {
        JSONArray arr = records();
        JSONObject o = new JSONObject();
        try {
            long now = System.currentTimeMillis();
            o.put("timestamp", now);
            o.put("date", new SimpleDateFormat("yyyy-MM-dd", Locale.KOREAN).format(new Date(now)));
            o.put("category", category);
            o.put("action", action);
            arr.put(o);
            getSharedPreferences(PREFS, MODE_PRIVATE).edit().putString(KEY_RECORDS, arr.toString()).apply();
        } catch (Exception ignored) {}
    }

    private JSONArray records() {
        String raw = getSharedPreferences(PREFS, MODE_PRIVATE).getString(KEY_RECORDS, "[]");
        try { return new JSONArray(raw); } catch (Exception e) { return new JSONArray(); }
    }

    private TextView text(String value, int sp, int color, boolean bold) {
        TextView t = new TextView(this);
        t.setText(value);
        t.setTextSize(sp);
        t.setTextColor(color);
        t.setLineSpacing(0, 1.18f);
        if (bold) t.setTypeface(t.getTypeface(), android.graphics.Typeface.BOLD);
        return t;
    }

    private Button primaryButton(String label, View.OnClickListener listener) {
        Button b = new Button(this);
        b.setText(label);
        b.setTextSize(16);
        b.setTextColor(Color.WHITE);
        b.setBackgroundColor(green);
        b.setAllCaps(false);
        b.setOnClickListener(listener);
        return b;
    }

    private Button outlineButton(String label, View.OnClickListener listener) {
        Button b = new Button(this);
        b.setText(label);
        b.setTextSize(16);
        b.setTextColor(ink);
        b.setBackgroundColor(Color.WHITE);
        b.setAllCaps(false);
        b.setOnClickListener(listener);
        return b;
    }

    private Button navButton(String label, View.OnClickListener listener) {
        Button b = new Button(this);
        b.setText(label);
        b.setTextSize(14);
        b.setTextColor(ink);
        b.setBackgroundColor(Color.TRANSPARENT);
        b.setAllCaps(false);
        b.setOnClickListener(listener);
        return b;
    }

    private LinearLayout.LayoutParams weight() {
        return new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1);
    }

    private LinearLayout.LayoutParams fullWrap(int bottomMargin) {
        LinearLayout.LayoutParams p = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        p.bottomMargin = bottomMargin;
        return p;
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }
}
