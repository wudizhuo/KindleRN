package com.kindleassistant.view;

import android.graphics.Color;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.facebook.react.uimanager.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.umeng.fb.FeedbackAgent;

public class RNUmengFeedBackView extends SimpleViewManager<TextView> {

    public static final String REACT_CLASS = "RNUmengFeedBackView";

    private TextView textView;
    private ThemedReactContext context;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected TextView createViewInstance(final ThemedReactContext reactContext) {
        context = reactContext;
        textView = new TextView(context);
        textView.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        textView.setGravity(Gravity.CENTER);
        textView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                goToFeedBack();
            }
        });
        return textView;
    }

    private void goToFeedBack() {
        FeedbackAgent agent = new FeedbackAgent(context);
        agent.startFeedbackActivity();
    }


    @ReactProp(name = "text")
    public void setText(TextView view, String text) {
        view.setText(text);
    }

    @ReactProp(name = "textSize", defaultFloat = 12f)
    public void setTextSize(TextView view, float textSize) {
        view.setTextSize(textSize);
    }

    @ReactProp(name = "textColor")
    public void setTextColor(TextView view, String textColor) {
        view.setTextColor(Color.parseColor(textColor));
    }


}