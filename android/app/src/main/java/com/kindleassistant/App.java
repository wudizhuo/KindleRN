package com.kindleassistant;

import android.app.Application;
import android.content.Context;

import com.umeng.analytics.MobclickAgent;
import com.umeng.fb.FeedbackAgent;
import com.umeng.update.UmengUpdateAgent;

public class App extends Application {
    private static Context applicationContext;
    private static App app;

    @Override
    public void onCreate() {
        super.onCreate();
        applicationContext = this.getApplicationContext();
        app = this;
        checkConfig();
    }

    /**
     * 检查应用配置
     */
    private void checkConfig() {
        // 友盟的配置
        // 调试模式
        MobclickAgent.setDebugMode(BuildConfig.DEBUG);
        // 检查友盟的res是否都复制进去了
        UmengUpdateAgent.setUpdateCheckConfig(BuildConfig.DEBUG);
        UmengUpdateAgent.setUpdateOnlyWifi(false);
    }

    public void appinit() {
        // 友盟检查更新服务
        UmengUpdateAgent.forceUpdate(App.getContext());

        FeedbackAgent agent = new FeedbackAgent(this);
        agent.sync();
    }

    public static App getApp() {
        return app;
    }

    public static Context getContext() {
        return applicationContext;
    }

}
