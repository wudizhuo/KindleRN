package com.kindleassistant;

import android.app.Application;
import android.content.Context;
import android.content.pm.PackageManager.NameNotFoundException;
import android.text.TextUtils;
import android.util.Log;

import com.android.volley.Response.Listener;
import com.kindleassistant.entity.UserCreateApi.UserCreateRqt;
import com.kindleassistant.entity.UserCreateApi.UserCreateRsp;
import com.kindleassistant.manager.UpdateMgr;
import com.kindleassistant.manager.UserInfoMgr;
import com.kindleassistant.manager.VolleyMgr;
import com.kindleassistant.net.GsonRequest;
import com.kindleassistant.utils.ChannelUtil;
import com.tencent.android.tpush.XGIOperateCallback;
import com.tencent.android.tpush.XGPushManager;
import com.umeng.analytics.AnalyticsConfig;
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
        // 使用在线配置功能
        MobclickAgent.updateOnlineConfig(getContext());
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

    public static Context getContext() {
        return applicationContext;
    }

}
